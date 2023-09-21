import { QueriesTypesSameAsBackend } from '@/types';

export const adaptCustomers = (
  customers: QueriesTypesSameAsBackend.Customer[]
) => {
  return customers.map((customer) => {
    return {
      id: `customer-${customer.customerId}`,
      fullName: `${customer.firstName} ${customer.lastName}`,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    };
  });
};
