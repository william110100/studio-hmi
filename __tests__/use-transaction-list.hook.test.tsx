import { act, render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { useTransactionList } from '@/features/transactions/hooks/use-transaction-list.hook';
import { useTransactionStore } from '@/features/transactions/store/transaction-store';
import { __setSimulateError } from '@/features/transactions/services/mock-transaction-repository';
import type { TransactionListViewModel } from '@/features/transactions/hooks/use-transaction-list.hook';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en-US' },
  }),
}));

let latest: TransactionListViewModel | undefined;
function Harness() {
  const vm = useTransactionList();
  // eslint-disable-next-line react-hooks/globals
  latest = vm;
  return <Text testID="status">{vm.status}</Text>;
}

function current(): TransactionListViewModel {
  if (!latest) throw new Error('Harness has not rendered yet');
  return latest;
}

describe('useTransactionList', () => {
  let unmount: (() => Promise<void>) | undefined;

  async function mount() {
    latest = undefined;
    const rendered = await render(<Harness />);
    unmount = rendered.unmount;
  }

  beforeEach(() => {
    useTransactionStore.setState({ transactions: [], status: 'idle', error: null });
    __setSimulateError(false);
    mockPush.mockClear();
  });

  afterEach(async () => {
    await unmount?.();
    unmount = undefined;
    latest = undefined;
  });

  it('goes loading -> success and groups the exact assessment sample into 3 sections', async () => {
    await mount();

    await waitFor(() => expect(current().status).toBe('success'), { timeout: 3000 });

    expect(current().sections).toHaveLength(3);
    expect(current().sections.flatMap((s) => s.data)).toHaveLength(4);
    expect(current().isEmpty).toBe(false);
  });

  it('goes loading -> error and surfaces the error message', async () => {
    __setSimulateError(true);
    await mount();

    await waitFor(() => expect(current().status).toBe('error'));
    expect(current().errorMessage).toBeTruthy();
  });

  it('filters to only debit (outgoing) transactions — the Refund row', async () => {
    await mount();
    await waitFor(() => expect(current().status).toBe('success'));

    await act(async () => current().setFilter('outgoing'));

    await waitFor(() => {
      const all = current().sections.flatMap((s) => s.data);
      expect(all).toHaveLength(1);
      expect(all[0].refId).toBe('789GHI');
    });
  });

  it('reports hasNoResults (not isEmpty) when a filter matches zero of an existing list', async () => {
    await mount();
    await waitFor(() => expect(current().status).toBe('success'));

    await act(async () => current().setSearchQuery('no-such-recipient-xyz'));

    await waitFor(() => expect(current().hasNoResults).toBe(true), { timeout: 2000 });
    expect(current().isEmpty).toBe(false);
  });

  it('navigates to /transaction/:refId on select', async () => {
    await mount();
    await waitFor(() => expect(current().status).toBe('success'));

    await act(async () => current().onSelectTransaction('123ABC'));

    expect(mockPush).toHaveBeenCalledWith('/transaction/123ABC');
  });
});
