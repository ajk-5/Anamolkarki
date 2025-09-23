import { useState } from 'react';

export default function useMetroTrade() {
  const [state, setState] = useState({});
  return { state, setState };
}
