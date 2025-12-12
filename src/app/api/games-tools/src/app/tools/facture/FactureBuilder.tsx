'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import './facture.css';

interface Party {
  nom: string;
  adresseLigne1: string;
  adresseLigne2: string;
  codePostal: string;
  ville: string;
  pays: string;
  email: string;
  telephone: string;
  siret: string;
  rcs: string;
}

interface BankDetails {
  banque: string;
  iban: string;
  bic: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantite: string;
  prixUnitaire: string;
}

interface SavedDraftData {
  client: Party;
  items: InvoiceItem[];
  conditions: string;
  lieu: string;
  echeance: string;
  remiseMontant?: string;
}

const pad2 = (n: number) => n.toString().padStart(2, '0');

const generateNumeroFacture = () => {
  const now = new Date();
  const stamp = `${now.getFullYear()}${pad2(now.getMonth() + 1)}${pad2(
    now.getDate()
  )}${pad2(now.getHours())}${pad2(now.getMinutes())}${pad2(now.getSeconds())}`;
  return `F${stamp}`;
};

const generateFileStamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(
    now.getDate()
  )}_${pad2(now.getHours())}-${pad2(now.getMinutes())}-${pad2(
    now.getSeconds()
  )}`;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

const emptyParty = (): Party => ({
  nom: '',
  adresseLigne1: '',
  adresseLigne2: '',
  codePostal: '',
  ville: '',
  pays: 'France',
  email: '',
  telephone: '',
  siret: '',
  rcs: '',
});

const createEmptyItem = (): InvoiceItem => ({
  id:
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
  description: '',
  quantite: '1',
  prixUnitaire: '0',
});

const toNumber = (value: string): number => {
  const normalized = value.replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatMoney = (value: number): string => {
  return value.toFixed(2).replace('.', ',');
};

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) return;
      setValue(JSON.parse(stored) as T);
    } catch {
      // ignore
    }
  }, [key]);

  const setAndStore = (next: T) => {
    setValue(next);
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  return [value, setAndStore];
}

const DEFAULT_CONDITIONS =
  'Paiement par virement. En cas de retard de paiement, indemnité forfaitaire de 40 EUR pour frais de recouvrement (article D441-5 du code de commerce).';

const FacturePdfApp: React.FC = () => {
  const [emetteur, setEmetteur] = useLocalStorage<Party>(
    'facture-emetteur-v1',
    emptyParty()
  );

  const [banque, setBanque] = useLocalStorage<BankDetails>(
    'facture-banque-v1',
    {
      banque: '',
      iban: '',
      bic: '',
    }
  );

  const [client, setClient] = useState<Party>(emptyParty());
  const [numero, setNumero] = useState<string>(generateNumeroFacture());
  const [dateFacture, setDateFacture] = useState<string>(todayISO());
  const [echeance, setEcheance] = useState<string>('Immediat');
  const [lieu, setLieu] = useState<string>('');
  const [conditions, setConditions] = useState<string>(DEFAULT_CONDITIONS);
  const [items, setItems] = useState<InvoiceItem[]>([createEmptyItem()]);
  const [remiseMontant, setRemiseMontant] = useState<string>('');

  const [savedDrafts, setSavedDrafts] = useLocalStorage<
    Record<string, SavedDraftData>
  >('facture-modeles-v1', {});
  const [draftName, setDraftName] = useState<string>('');
  const [selectedDraft, setSelectedDraft] = useState<string>('');

  const { totalHT, remiseTotale, totalApresRemise } = useMemo(() => {
    const baseTotal = items.reduce(
      (sum, item) =>
        sum +
        toNumber(item.quantite || '') * toNumber(item.prixUnitaire || ''),
      0
    );
    const remiseValue = Math.max(0, toNumber(remiseMontant || ''));
    const remise = Math.min(baseTotal, remiseValue);
    const net = baseTotal - remise;
    return {
      totalHT: baseTotal,
      remiseTotale: remise,
      totalApresRemise: net,
    };
  }, [items, remiseMontant]);

  const updateEmetteur = (field: keyof Party, value: string) => {
    setEmetteur({ ...emetteur, [field]: value });
  };

  const updateBanque = (field: keyof BankDetails, value: string) => {
    setBanque({ ...banque, [field]: value });
  };

  const updateClient = (field: keyof Party, value: string) => {
    setClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    id: string,
    field: keyof Omit<InvoiceItem, 'id'>,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((i) => i.id !== id)));
  };

  const handleNewInvoice = () => {
    setNumero(generateNumeroFacture());
    setDateFacture(todayISO());
    setClient(emptyParty());
    setLieu('');
    setEcheance('Immediat');
    setConditions(DEFAULT_CONDITIONS);
    setItems([createEmptyItem()]);
    setRemiseMontant('');
    setSelectedDraft('');
  };

  const handleSaveDraft = () => {
    const name = draftName.trim();
    if (!name) {
      alert('Veuillez saisir un nom pour le modele de facture.');
      return;
    }
    const data: SavedDraftData = {
      client,
      items,
      conditions,
      lieu,
      echeance,
      remiseMontant,
    };
    setSavedDrafts((prev) => ({ ...prev, [name]: data }));
    setSelectedDraft(name);
  };

  const handleLoadDraft = (name: string) => {
    if (!name) return;
    const data = savedDrafts[name];
    if (!data) return;
    setClient(data.client);
    setItems(data.items && data.items.length ? data.items : [createEmptyItem()]);
    setConditions(data.conditions || DEFAULT_CONDITIONS);
    setLieu(data.lieu || '');
    setEcheance(data.echeance || 'Immediat');
    setRemiseMontant(data.remiseMontant ?? '');
    setSelectedDraft(name);
  };

  const handleDeleteDraft = () => {
    if (!selectedDraft) return;
    const next = { ...savedDrafts };
    delete next[selectedDraft];
    setSavedDrafts(next);
    setSelectedDraft('');
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginLeft = 18;
    const marginRight = 18;
    const marginTop = 20;
    const marginBottom = 22;
    const usableWidth = pageWidth - marginLeft - marginRight;
    const bottomLimit = pageHeight - marginBottom;

    const addHeader = () => {
      let y = marginTop;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      const emitterName = emetteur.nom || 'Nom ou raison sociale';
      doc.text(emitterName, marginLeft, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const emitterLines: string[] = [];
      if (emetteur.adresseLigne1) emitterLines.push(emetteur.adresseLigne1);
      if (emetteur.adresseLigne2) emitterLines.push(emetteur.adresseLigne2);
      if (emetteur.codePostal || emetteur.ville) {
        emitterLines.push(`${emetteur.codePostal} ${emetteur.ville}`.trim());
      }
      if (emetteur.pays) emitterLines.push(emetteur.pays);
      if (emetteur.email) emitterLines.push(emetteur.email);
      if (emetteur.telephone) emitterLines.push(emetteur.telephone);
      if (emetteur.siret) emitterLines.push(`SIRET : ${emetteur.siret}`);
      if (emetteur.rcs) emitterLines.push(`RCS : ${emetteur.rcs}`);

      emitterLines.forEach((line) => {
        doc.text(line, marginLeft, y);
        y += 4;
      });

      const rightX = marginLeft + usableWidth;
      let yRight = marginTop;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('FACTURE', rightX, yRight, { align: 'right' });
      yRight += 7;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`No ${numero}`, rightX, yRight, { align: 'right' });
      yRight += 5;
      doc.text(`Date : ${dateFacture}`, rightX, yRight, { align: 'right' });

      return Math.max(y, yRight) + 6;
    };

    const addClientBlock = (startY: number) => {
      let y = startY;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(3, 105, 161);
      doc.text('A L ATTENTION DE', marginLeft, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      const clientLines: string[] = [];
      if (client.nom) clientLines.push(client.nom);
      if (client.adresseLigne1) clientLines.push(client.adresseLigne1);
      if (client.adresseLigne2) clientLines.push(client.adresseLigne2);
      if (client.codePostal || client.ville) {
        clientLines.push(`${client.codePostal} ${client.ville}`.trim());
      }
      if (client.pays) clientLines.push(client.pays);
      if (client.siret) clientLines.push(`SIRET : ${client.siret}`);
      if (client.rcs) clientLines.push(`RCS : ${client.rcs}`);

      if (clientLines.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184);
        doc.text('Coordonnees du client a renseigner', marginLeft, y);
        y += 5;
      } else {
        doc.setFontSize(10);
        clientLines.forEach((line) => {
          const wrapped = doc.splitTextToSize(line, usableWidth * 0.6);
          wrapped.forEach((wLine) => {
            doc.text(wLine, marginLeft, y);
            y += 4;
          });
        });
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const rightX = marginLeft + usableWidth;
      let yRight = startY + 2;
      if (lieu) {
        doc.text('Lieu d emission :', rightX, yRight, { align: 'right' });
        yRight += 4;
        doc.text(lieu, rightX, yRight, { align: 'right' });
      }

      return Math.max(y, yRight) + 6;
    };

    const addTableHeader = (y: number) => {
      doc.setDrawColor(2, 132, 199);
      doc.setFillColor(2, 132, 199);
      const rowHeight = 7;
      doc.rect(marginLeft, y, usableWidth, rowHeight, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);

      const colDescX = marginLeft + 2;
      const colQtyX = marginLeft + usableWidth * 0.6;
      const colUnitX = marginLeft + usableWidth * 0.78;
      const colTotalX = marginLeft + usableWidth - 2;

      const headerY = y + 4.5;
      doc.text('Description', colDescX, headerY);
      doc.text('Quantite', colQtyX, headerY, { align: 'right' });
      doc.text('Prix unitaire EUR', colUnitX, headerY, { align: 'right' });
      doc.text('Montant EUR', colTotalX, headerY, { align: 'right' });

      doc.setTextColor(15, 23, 42);
      return y + rowHeight;
    };

    const addItemRows = (startY: number) => {
      let y = startY;
      const lineHeight = 5;
      const colDescX = marginLeft + 2;
      const colQtyX = marginLeft + usableWidth * 0.6;
      const colUnitX = marginLeft + usableWidth * 0.78;
      const colTotalX = marginLeft + usableWidth - 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const newPageWithHeader = () => {
        doc.addPage();
        const afterHeader = addHeader();
        return addTableHeader(afterHeader);
      };

      const ensureSpace = (needed: number) => {
        if (y + needed <= bottomLimit) return;
        y = newPageWithHeader();
      };

      items.forEach((item) => {
        const qty = toNumber(item.quantite || '');
        const unit = toNumber(item.prixUnitaire || '');
        const montant = qty * unit;

        const desc = item.description || 'Description a completer';
        const maxDescWidth = colQtyX - colDescX - 4;
        const descLines = doc.splitTextToSize(desc, maxDescWidth);
        const rowHeight = Math.max(lineHeight, descLines.length * lineHeight);

        ensureSpace(rowHeight + 2);

        descLines.forEach((line, idx) => {
          doc.setTextColor(
            item.description ? 15 : 148,
            item.description ? 23 : 163,
            item.description ? 42 : 184
          );
          doc.text(line, colDescX, y + lineHeight * (idx + 1) - 1);
        });

        doc.setTextColor(15, 23, 42);
        const baseY = y + lineHeight + (descLines.length - 1) * lineHeight;
        if (item.quantite) {
          doc.text(item.quantite, colQtyX, baseY - 1, { align: 'right' });
        }
        if (item.prixUnitaire) {
          doc.text(formatMoney(unit), colUnitX, baseY - 1, { align: 'right' });
        }
        if (montant) {
          doc.text(formatMoney(montant), colTotalX, baseY - 1, {
            align: 'right',
          });
        }

        y += rowHeight;
        doc.setDrawColor(226, 232, 240);
        doc.line(marginLeft, y, marginLeft + usableWidth, y);
      });

      return y + 4;
    };

    const addTotalsAndFooter = (startY: number) => {
      let y = startY;

      const tvaText =
        'TVA non applicable, article 293 B du code general des impots.';
      const tvaLines = doc.splitTextToSize(tvaText, usableWidth);

      const bankLines: string[] = [];
      if (banque.banque) bankLines.push(`Banque : ${banque.banque}`);
      if (banque.iban) bankLines.push(`IBAN : ${banque.iban}`);
      if (banque.bic) bankLines.push(`BIC : ${banque.bic}`);

      const conditionsLabel = 'Conditions : ';
      const conditionsText = conditions || DEFAULT_CONDITIONS;
      const conditionsLines = doc.splitTextToSize(
        conditionsText,
        usableWidth - doc.getTextWidth(conditionsLabel) - 2
      );

      const linesFooterCount =
        tvaLines.length + bankLines.length + conditionsLines.length + 6;
      const totalsBoxHeight = remiseTotale > 0 ? 18 : 14;
      const estimatedHeight = totalsBoxHeight + linesFooterCount * 4 + 10;

      const ensureSpace = (needed: number) => {
        if (y + needed <= bottomLimit) return;
        doc.addPage();
        const afterHeader = addHeader();
        y = afterHeader;
      };

      ensureSpace(estimatedHeight);

      const boxWidth = 58;
      const boxX = marginLeft + usableWidth - boxWidth;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setDrawColor(207, 232, 241);
      doc.setFillColor(246, 251, 252);
      const boxHeight = remiseTotale > 0 ? 18 : 14;
      doc.rect(boxX, y, boxWidth, boxHeight, 'FD');

      let textY = y + 5;
      doc.text('Sous-total HT', boxX + 2, textY);
      doc.text(`${formatMoney(totalHT)} EUR`, boxX + boxWidth - 2, textY, {
        align: 'right',
      });

      if (remiseTotale > 0) {
        textY += 5;
        doc.text('Remise', boxX + 2, textY);
        doc.text(`- ${formatMoney(remiseTotale)} EUR`, boxX + boxWidth - 2, textY, {
          align: 'right',
        });
      }

      textY += 5;
      doc.setFont('helvetica', 'bold');
      doc.text('Total HT', boxX + 2, textY);
      doc.text(`${formatMoney(totalApresRemise)} EUR`, boxX + boxWidth - 2, textY, {
        align: 'right',
      });

      y += boxHeight + 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      tvaLines.forEach((line) => {
        doc.text(line, marginLeft, y);
        y += 4;
      });

      y += 4;

      const colWidth = usableWidth / 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Echeance', marginLeft, y);
      doc.text('Details bancaires', marginLeft + colWidth, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text(echeance || 'Immediat', marginLeft, y);

      let bankY = y;
      bankLines.forEach((line) => {
        const wrapped = doc.splitTextToSize(line, colWidth);
        wrapped.forEach((wLine) => {
          doc.text(wLine, marginLeft + colWidth, bankY);
          bankY += 4;
        });
      });

      y = Math.max(y + 4, bankY + 2);

      doc.setFont('helvetica', 'bold');
      const labelWidth = doc.getTextWidth(conditionsLabel);
      doc.text(conditionsLabel, marginLeft, y);
      doc.setFont('helvetica', 'normal');
      const condX = marginLeft + labelWidth + 1;
      let condY = y;

      conditionsLines.forEach((line, index) => {
        if (index === 0) {
          doc.text(line, condX, condY);
        } else {
          condY += 4;
          doc.text(line, marginLeft, condY);
        }
      });
    };

    let y = addHeader();
    y = addClientBlock(y);
    y = addTableHeader(y);
    y = addItemRows(y);
    addTotalsAndFooter(y);

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i += 1) {
      doc.setPage(i);
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();
      doc.setDrawColor(186, 197, 209);
      doc.rect(8, 8, w - 16, h - 16);
      doc.setFontSize(9);
      doc.text(`Page ${i} / ${pageCount}`, 10, 12);
    }

    const stamp = generateFileStamp();
    doc.save(`FACTURE-${stamp}.pdf`);
  };

  const renderPartyBlock = (party: Party) => (
    <div className='invoice-party-text'>
      <div
        style={{
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {party.nom}
      </div>
      {party.adresseLigne1 && <div>{party.adresseLigne1}</div>}
      {party.adresseLigne2 && <div>{party.adresseLigne2}</div>}
      {(party.codePostal || party.ville) && (
        <div>
          {party.codePostal} {party.ville}
        </div>
      )}
      {party.pays && <div>{party.pays}</div>}
      {party.email && <div>{party.email}</div>}
      {party.telephone && <div>{party.telephone}</div>}
      {party.siret && <div>SIRET : {party.siret}</div>}
      {party.rcs && <div>RCS : {party.rcs}</div>}
    </div>
  );

  const hasRemise = remiseTotale > 0;

  return (
    <div className='facture-root'>
      <div className='facture-layout'>
        <div className='facture-panel facture-form-panel'>
          <h1 className='app-title'>Generateur de factures (modele francais)</h1>
          <p className='app-subtitle'>
            Creez, reutilisez et telechargez vos factures au format PDF, avec
            coordonnees emetteur et client, lignes de facturation, remise,
            conditions et details bancaires.
          </p>

          <section className='section'>
            <div className='section-title'>Vos informations (emetteur)</div>
            <div className='section-grid-two'>
              <input
                className='field-input'
                placeholder='Nom ou raison sociale'
                value={emetteur.nom}
                onChange={(e) => updateEmetteur('nom', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Adresse ligne 1'
                value={emetteur.adresseLigne1}
                onChange={(e) => updateEmetteur('adresseLigne1', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Adresse ligne 2'
                value={emetteur.adresseLigne2}
                onChange={(e) => updateEmetteur('adresseLigne2', e.target.value)}
              />
              <div className='section-grid-three'>
                <input
                  className='field-input'
                  placeholder='Code postal'
                  value={emetteur.codePostal}
                  onChange={(e) => updateEmetteur('codePostal', e.target.value)}
                />
                <input
                  className='field-input'
                  placeholder='Ville'
                  value={emetteur.ville}
                  onChange={(e) => updateEmetteur('ville', e.target.value)}
                />
              </div>
              <input
                className='field-input'
                placeholder='Pays'
                value={emetteur.pays}
                onChange={(e) => updateEmetteur('pays', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Email'
                value={emetteur.email}
                onChange={(e) => updateEmetteur('email', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Telephone'
                value={emetteur.telephone}
                onChange={(e) => updateEmetteur('telephone', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='SIRET'
                value={emetteur.siret}
                onChange={(e) => updateEmetteur('siret', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='RCS (Ville + numero)'
                value={emetteur.rcs}
                onChange={(e) => updateEmetteur('rcs', e.target.value)}
              />
            </div>
          </section>

          <section className='section'>
            <div className='section-title'>Client</div>
            <div className='section-grid-two'>
              <input
                className='field-input'
                placeholder='Nom ou raison sociale'
                value={client.nom}
                onChange={(e) => updateClient('nom', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Adresse ligne 1'
                value={client.adresseLigne1}
                onChange={(e) => updateClient('adresseLigne1', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Adresse ligne 2'
                value={client.adresseLigne2}
                onChange={(e) => updateClient('adresseLigne2', e.target.value)}
              />
              <div className='section-grid-three'>
                <input
                  className='field-input'
                  placeholder='Code postal'
                  value={client.codePostal}
                  onChange={(e) => updateClient('codePostal', e.target.value)}
                />
                <input
                  className='field-input'
                  placeholder='Ville'
                  value={client.ville}
                  onChange={(e) => updateClient('ville', e.target.value)}
                />
              </div>
              <input
                className='field-input'
                placeholder='Pays'
                value={client.pays}
                onChange={(e) => updateClient('pays', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Email'
                value={client.email}
                onChange={(e) => updateClient('email', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='Telephone'
                value={client.telephone}
                onChange={(e) => updateClient('telephone', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='SIRET'
                value={client.siret}
                onChange={(e) => updateClient('siret', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='RCS (Ville + numero)'
                value={client.rcs}
                onChange={(e) => updateClient('rcs', e.target.value)}
              />
            </div>
          </section>

          <section className='section'>
            <div className='section-title'>Facture</div>
            <div className='section-grid-two'>
              <div>
                <div className='field-label'>Numero</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    className='field-input'
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  <button
                    type='button'
                    className='btn btn-ghost'
                    onClick={() => setNumero(generateNumeroFacture())}
                  >
                    Generer
                  </button>
                </div>
              </div>
              <div>
                <div className='field-label'>Date</div>
                <input
                  type='date'
                  className='field-input'
                  value={dateFacture}
                  onChange={(e) => setDateFacture(e.target.value)}
                />
              </div>
              <div>
                <div className='field-label'>Lieu d emission</div>
                <input
                  className='field-input'
                  placeholder='Ville'
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                />
              </div>
              <div>
                <div className='field-label'>Echeance</div>
                <input
                  className='field-input'
                  placeholder='Immediat / 30 jours ...'
                  value={echeance}
                  onChange={(e) => setEcheance(e.target.value)}
                />
              </div>
              <div>
                <div className='field-label'>Remise (EUR)</div>
                <input
                  className='field-input'
                  style={{ textAlign: 'right' }}
                  placeholder='Montant de remise'
                  value={remiseMontant}
                  onChange={(e) => setRemiseMontant(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className='section'>
            <div className='section-title'>Lignes de facturation</div>
            <div>
              <div className='item-grid-header'>
                <div>Description</div>
                <div>Quantite</div>
                <div>Prix unitaire (EUR)</div>
                <div></div>
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='item-grid-row'
                  style={{ marginBottom: 4 }}
                >
                  <input
                    className='field-input'
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(item.id, 'description', e.target.value)
                    }
                    placeholder='Prestation / service'
                  />
                  <input
                    className='field-input'
                    style={{ textAlign: 'right' }}
                    value={item.quantite}
                    onChange={(e) =>
                      handleItemChange(item.id, 'quantite', e.target.value)
                    }
                  />
                  <input
                    className='field-input'
                    style={{ textAlign: 'right' }}
                    value={item.prixUnitaire}
                    onChange={(e) =>
                      handleItemChange(item.id, 'prixUnitaire', e.target.value)
                    }
                  />
                  <button
                    type='button'
                    className='item-remove-button'
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={addItem}
                className='btn btn-ghost'
                style={{ marginTop: 4 }}
              >
                + Ajouter une ligne
              </button>
            </div>
          </section>

          <section className='section'>
            <div className='section-title'>Paiement et conditions</div>
            <div className='section-grid-two' style={{ marginBottom: 8 }}>
              <input
                className='field-input'
                placeholder='Banque'
                value={banque.banque}
                onChange={(e) => updateBanque('banque', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='IBAN'
                value={banque.iban}
                onChange={(e) => updateBanque('iban', e.target.value)}
              />
              <input
                className='field-input'
                placeholder='BIC'
                value={banque.bic}
                onChange={(e) => updateBanque('bic', e.target.value)}
              />
            </div>
            <div>
              <div className='field-label'>Conditions (une seule ligne)</div>
              <input
                className='field-input'
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
              />
            </div>
          </section>

          <section>
            <div className='button-row' style={{ marginBottom: 12 }}>
              <button
                type='button'
                onClick={handleNewInvoice}
                className='btn btn-primary'
              >
                Nouvelle facture
              </button>
              <button
                type='button'
                onClick={handleDownloadPdf}
                className='btn btn-success'
              >
                Telecharger en PDF
              </button>
            </div>

            <div className='small-text' style={{ marginTop: 4 }}>
              <div
                style={{ fontWeight: 600, color: '#475569', marginBottom: 4 }}
              >
                Modeles de facture
              </div>
              <div className='model-row' style={{ marginBottom: 8 }}>
                <input
                  className='field-input'
                  placeholder='Nom du modele (ex : Client X)'
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  style={{ maxWidth: 220 }}
                />
                <button
                  type='button'
                  className='btn btn-ghost'
                  onClick={handleSaveDraft}
                >
                  Enregistrer le modele
                </button>
              </div>
              {Object.keys(savedDrafts).length > 0 && (
                <div className='model-row'>
                  <select
                    className='model-select'
                    value={selectedDraft}
                    onChange={(e) => handleLoadDraft(e.target.value)}
                  >
                    <option value=''>Choisir un modele…</option>
                    {Object.keys(savedDrafts).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={handleDeleteDraft}
                  >
                    Supprimer le modele selectionne
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className='facture-panel facture-preview-panel'>
          <div className='invoice-sheet'>
            <div className='invoice-header'>
              <div>{renderPartyBlock(emetteur)}</div>
              <div className='invoice-title-block'>
                <div className='invoice-title'>FACTURE</div>
                <div className='invoice-number'>No {numero}</div>
              </div>
            </div>

            <div className='invoice-divider' />

            <div className='invoice-meta'>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: '#0369a1',
                    marginBottom: 4,
                  }}
                >
                  A l attention de
                </div>
                {client.nom ? (
                  renderPartyBlock(client)
                ) : (
                  <div className='text-muted invoice-table-empty'>
                    Coordonnees du client a renseigner
                  </div>
                )}
              </div>
              <div className='invoice-meta-right'>
                <div className='invoice-meta-label'>Date</div>
                <div>{dateFacture}</div>
                {lieu && <div>Emise a {lieu}</div>}
              </div>
            </div>

            <table className='invoice-table'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th className='text-right'>Quantite</th>
                  <th className='text-right'>Prix unitaire EUR</th>
                  <th className='text-right'>Montant EUR</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const qty = toNumber(item.quantite || '');
                  const unit = toNumber(item.prixUnitaire || '');
                  const montant = qty * unit;
                  return (
                    <tr key={item.id}>
                      <td>
                        {item.description ? (
                          item.description
                        ) : (
                          <span className='invoice-table-empty'>
                            Description a completer
                          </span>
                        )}
                      </td>
                      <td className='text-right'>{item.quantite || ''}</td>
                      <td className='text-right'>
                        {item.prixUnitaire ? formatMoney(unit) : ''}
                      </td>
                      <td className='text-right'>
                        {montant ? formatMoney(montant) : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className='invoice-totals-wrapper'>
              <div className='invoice-totals'>
                <div className='invoice-totals-row subtotal'>
                  <div>Sous-total HT</div>
                  <div>{formatMoney(totalHT)} EUR</div>
                </div>
                {hasRemise && (
                  <div className='invoice-totals-row'>
                    <div>Remise</div>
                    <div>-{formatMoney(remiseTotale)} EUR</div>
                  </div>
                )}
                <div className='invoice-totals-row total'>
                  <div>Total HT</div>
                  <div>{formatMoney(totalApresRemise)} EUR</div>
                </div>
              </div>
            </div>

            <div className='invoice-note'>
              TVA non applicable, article 293 B du code general des impots.
            </div>

            <div className='invoice-footer-grid'>
              <div>
                <div className='invoice-footer-title'>Echeance</div>
                <div>{echeance || 'Immediat'}</div>
              </div>
              <div>
                <div className='invoice-footer-title'>Details bancaires</div>
                {banque.banque && <div>Banque : {banque.banque}</div>}
                {banque.iban && <div>IBAN : {banque.iban}</div>}
                {banque.bic && <div>BIC : {banque.bic}</div>}
              </div>
            </div>
            <div className='invoice-conditions-line'>
              <span className='invoice-conditions-line-label'>Conditions : </span>
              <span>{conditions}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturePdfApp;
