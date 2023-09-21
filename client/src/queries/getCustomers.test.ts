import { getCustomers } from '@/queries/getCustomers';
import { QueriesTypesSameAsBackend } from '@/types';

describe('getCustomers Function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should fetch customers and return them', async () => {
    const mockFetch = jest.fn();
    globalThis.fetch = mockFetch;

    const mockCustomers: QueriesTypesSameAsBackend.Customer[] = [
      {
        "customerId": 1,
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@email.com",
        "phone": "123-456-7890"
      },
      {
        "customerId": 2,
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob.johnson@email.com",
        "phone": "987-654-3210"
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCustomers),
    } as any);

    const result = await getCustomers();

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/mockdata/customers');
    expect(result).toEqual(mockCustomers);
  });
});
