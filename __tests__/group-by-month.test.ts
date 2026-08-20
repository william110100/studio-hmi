import { groupTransactionsByMonth } from '@/features/transactions/utils/group-by-month';
import { MOCK_TRANSACTIONS } from '@/mocks/transactions.mock';

describe('groupTransactionsByMonth', () => {
  it('groups the exact assessment sample into 3 month sections in input order', () => {
    const sections = groupTransactionsByMonth(MOCK_TRANSACTIONS, 'en-US');

    expect(sections).toHaveLength(3);
    expect(sections[0].title).toBe('October 2024');
    expect(sections[0].data.map((t) => t.refId)).toEqual(['123ABC', '789GHI']);
    expect(sections[1].title).toBe('September 2024');
    expect(sections[2].title).toBe('August 2024');
  });

  it('groups a second same-month transaction into the existing section rather than a new one', () => {
    const octoberFirst = MOCK_TRANSACTIONS[0];
    const octoberSecond = MOCK_TRANSACTIONS[2];
    const sections = groupTransactionsByMonth([octoberFirst, octoberSecond], 'en-US');

    expect(sections).toHaveLength(1);
    expect(sections[0].data).toHaveLength(2);
  });

  it('returns an empty array for an empty input, not a section with empty data', () => {
    expect(groupTransactionsByMonth([], 'en-US')).toEqual([]);
  });
});
