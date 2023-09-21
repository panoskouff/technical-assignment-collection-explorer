import { QueriesTypesSameAsBackend } from '@/types';

const customersEndpoint = 'http://localhost:3000/api/mockdata/customers';

export const getCustomers = async (): Promise<
  QueriesTypesSameAsBackend.Customer[]
> => {
  const response = await fetch(customersEndpoint);
  const data: QueriesTypesSameAsBackend.Customer[] = await response.json();
  return data;
};
