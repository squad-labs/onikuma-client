import React from 'react';
import styles from '@/widgets/table/myDataTable/MyDataTable.module.scss';
import classNames from 'classnames/bind';
import CheckResultsButton from '@/components/common/button/checkResultsButton';
import StatusBar from '@/widgets/bar/statusBar';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';

const cn = classNames.bind(styles);

type TableRow = {
  topicId: string;
  name: string;
  status: string;
  startAt: string;
  endAt: string;
  totalPoolIn: number;
  totalCostPnL: number;
  totalPercentPnL: number;
  isBiggestTopicPooler: boolean;
  competitors: {
    name: string;
    isBiggestPickerPooler: boolean;
  }[];
};

type MyDataTableProps = {
  data: TableRow[];
};

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
};

const formatDollar = (value: number) => {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  return formattedNumber;
};

const formatSign = (value: number) => {
  return value >= 0 ? '+' : '';
};

const MyDataTable = ({ data }: MyDataTableProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <table className={cn('my-table')}>
      <thead>
        <tr className={cn('table-row-names')}>
          <th className={cn('th-name')}>Name</th>
          <th>Status</th>
          <th>Schedule</th>
          <th>Pooled in</th>
          <th>PnL ($)</th>
          <th>PnL (%)</th>
          <th>Check Results</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className={cn('td-name')}>{item.name}</td>
            <td>
              <StatusBar label={item.status} />
            </td>
            <td>{`${formatDateString(item.startAt)}`}</td>
            <td>
              {formatSign(item.totalPoolIn)}
              {formatDollar(item.totalPoolIn)}
            </td>
            <td>
              {formatSign(item.totalCostPnL)}
              {formatDollar(item.totalCostPnL)}
            </td>
            <td>
              {formatSign(item.totalPercentPnL)}
              {formatDollar(item.totalPercentPnL)}%
            </td>
            <td className={cn('td-check-results')}>
              <CheckResultsButton
                text={
                  item.isBiggestTopicPooler ? 'Hall of Honor' : 'Check Results'
                }
                primaryColor={
                  item.isBiggestTopicPooler
                    ? 'BASE_RED_1'
                    : item.status.toLowerCase() === 'ongoing'
                      ? 'DARK_GRAY_5'
                      : 'BASE_BLUE_1'
                }
                secondaryColor="BASE_CREAM_1"
                onClick={() => {
                  if (item.isBiggestTopicPooler) {
                    router.push(`/hall-of-honor/${item.topicId}`);
                  } else {
                    dispatch(
                      OPEN_MODAL({
                        name: 'PoolResultModalProps',
                        data: {
                          topicId: item.topicId,
                          totalGain: item.totalCostPnL,
                          totalPnl: item.totalPercentPnL,
                          totalPoolIn: item.totalPoolIn,
                          competitors: item.competitors,
                        },
                      }),
                    );
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyDataTable;
