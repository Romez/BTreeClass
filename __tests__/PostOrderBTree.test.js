import { PostOrderBTree } from '../src/index';

describe('test', () => {
  const btree = new PostOrderBTree();

  btree.add(20, { text: 'test' });
  btree.add(13, { text: 'test' });
  btree.add(24, { text: 'test' });
  btree.add(27, { text: 'test' });
  btree.add(48, { text: 'test' });
  btree.add(3, { text: 'test' });
  btree.add(7, { text: 'test' });

  test('test true contains', () => {
    expect(btree.contains(13)).toBeTruthy();
  });

  test('test falsy contains', () => {
    expect(btree.contains(30)).toBeFalsy();
  });

  test('test count', () => {
    expect(btree.count).toBe(7);
  });

  test('test remove', () => {
    expect(btree.contains(24)).toBeTruthy();

    btree.remove(24);

    expect(btree.contains(24)).toBeFalsy();
  });
});
