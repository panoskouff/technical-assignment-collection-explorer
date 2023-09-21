import { adaptCustomers } from '@/queries/adapters/adaptCustomers';
import { QueriesTypesSameAsBackend } from '@/types';

describe('adaptCustomers Adapter Function', () => {

  it('Should correctly adapt the customer data', () => {
    const mockData: QueriesTypesSameAsBackend.Customer[] = [
      {
        customerId: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@email.com',
        phone: '123-456-7890'
      },
      {
        customerId: 2,
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@email.com',
        phone: '987-654-3210'
      },
    ];

    const expectedAdaptedData = [
      {
        id: 'customer-1',
        fullName: 'Alice Smith',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@email.com',
        phone: '123-456-7890',
      },
      {
        id: 'customer-2',
        fullName: 'Bob Johnson',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@email.com',
        phone: '987-654-3210',
      },
    ];

    const adaptedData = adaptCustomers(mockData);

    expect(adaptedData).toEqual(expectedAdaptedData);
  });
});
