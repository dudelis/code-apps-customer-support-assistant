import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchCustomers, createCustomer as createCustomerService } from '../services/dataverseService';
import type { NewCustomerInput } from '../services/dataverseService';
import type { Customer } from '../types';

interface CustomersContextValue {
  all: Customer[];
  isLoading: boolean;
  error: string | null;
  byId: (id: string) => Customer | undefined;
  createCustomer: (input: NewCustomerInput) => Promise<void>;
}

export const CustomersContext = createContext<CustomersContextValue>({
  all: [],
  isLoading: false,
  error: null,
  byId: () => undefined,
  createCustomer: async () => {},
});

export function useCustomersState(): CustomersContextValue {
  const [all, setAll] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchCustomers()
      .then(setAll)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load customers.'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const byId = useCallback((id: string) => all.find(c => c.id === id), [all]);

  const createCustomer = useCallback(async (input: NewCustomerInput) => {
    await createCustomerService(input);
    load();
  }, [load]);

  return { all, isLoading, error, byId, createCustomer };
}

export function useCustomers(): CustomersContextValue {
  return useContext(CustomersContext);
}
