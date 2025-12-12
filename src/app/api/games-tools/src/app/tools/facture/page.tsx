import { Metadata } from 'next';
import FactureBuilder from './FactureBuilder';

export const metadata: Metadata = {
  title: 'Générateur de facture PDF (modèle français)',
  description:
    'Créez, modifiez et imprimez des factures en français. Numéro auto-généré à partir de la date/heure, lignes multiples, total HT/TTC et mention TVA.',
  keywords: ['facture', 'facturation', 'facture PDF', 'modèle facture', 'TVA', 'outil facture français'],
  openGraph: {
    title: 'Générateur de facture PDF (modèle français)',
    description:
      'Composez des factures en ligne : numérotation automatique, totaux HT/TTC, TVA et export PDF prêt à imprimer.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Générateur de facture PDF en ligne',
    description:
      'Créez une facture PDF au format français, numérotation horodatée, totaux HT/TTC. 100% dans le navigateur.',
  },
};

export default function FacturePage() {
  return <FactureBuilder />;
}
