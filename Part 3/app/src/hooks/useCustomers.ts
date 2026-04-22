import { useMemo } from 'react';
import { customers } from '../data/customers';

export function useCustomers() {
  const all = useMemo(() => customers, []);
  const byId = (id: string) => all.find(c => c.id === id);
  return { all, byId };
}
