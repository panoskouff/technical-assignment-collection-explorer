import { searchInCollection } from '@/utils/searchInCollection';
import { CollectionData } from '@/types';

describe('searchInCollection Function', () => {
  const mockCollectionData: CollectionData[] = [
    { name: 'Apple', id: '1' },
    { name: 'Banana', id: '2' },
    { name: 'Cherry', id: '3' },
  ];

  it('Should return an empty array if collectionData is null', () => {
    const result = searchInCollection('Apple', null, 'name');
    expect(result).toEqual([]);
  });

  it('Should return the same collectionData (all) if the searchQuery is empty', () => {
    const result = searchInCollection('', mockCollectionData, 'name');
    expect(result).toEqual(mockCollectionData);
  });

  it('Should filter collectionData based on the searchQuery for the selectedOption', () => {
    let result = searchInCollection('Apple', mockCollectionData, 'name');
    expect(result).toEqual([{ name: 'Apple', id: '1' }]);

    result = searchInCollection('Apple', mockCollectionData, 'id');
    expect(result).toEqual([]);
  });

  it('Should return an empty array if the selectedOption does not exist in collectionData items', () => {
    const result = searchInCollection('Apple', mockCollectionData, 'nonexistent');
    expect(result).toEqual([]);
  });
});
