import { firebaseObjectToArray } from './firebase';

describe('firebaseObjectToArray', () => {
  it('converts a map from firebase to an array of entries', () => {
    const obj = {
      key1: {
        field: 'some-value',
        otherField: 'some-other-value',
      },
      key2: {
        field: 'some-other-value',
        otherField: 'some-other-other-value',
      },
    };

    const expectedArray = [
      {
        id: 'key1',
        field: 'some-value',
        otherField: 'some-other-value',
      },
      {
        id: 'key2',
        field: 'some-other-value',
        otherField: 'some-other-other-value',
      },
    ];

    expect(firebaseObjectToArray(obj)).toEqual(expectedArray);
  });

  describe('when the object is not defined', () => {
    it('returns an empty array', () => {
      expect(firebaseObjectToArray()).toEqual([]);
      expect(firebaseObjectToArray(null)).toEqual([]);
      expect(firebaseObjectToArray(undefined)).toEqual([]);
    });
  });
});
