import { CollectionData } from '@/types';

function isValidKey<T extends object>(obj: T, key: keyof any): key is keyof T {
  return key in obj;
}

export const searchInCollection = (
  searchQuery: string,
  collectionData: CollectionData[] | null,
  selectedOption: string
): CollectionData[] => {
  if (!collectionData) {
    return [];
  }
  if (searchQuery.trim() === '') {
    return collectionData;
  } else {
    return collectionData.filter((item) => {
      if (isValidKey(item, selectedOption)) {
        return String(item[selectedOption])
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      return false;
    });
  }
};
