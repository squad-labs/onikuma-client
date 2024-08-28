import React from 'react';
import styles from '@/widgets/table/myDataTable/MyDataTable.module.scss';
import classNames from 'classnames/bind';
import CheckResultsButton from '@/components/common/button/checkResultsButton';
import StatusBar from '@/widgets/bar/statusBar';

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
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString(undefined, options);
};

const MyDataTable = ({ data }: MyDataTableProps) => {
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
            <td className={cn('td-name')}>
               {item.name}
            </td>
            <td>
              <StatusBar
                label = {item.status}
                />
            </td>
            <td>{`${formatDateString(item.startAt)} - ${formatDateString(item.endAt)}`}</td>
            <td>${item.totalPoolIn}</td>
            <td>${item.totalCostPnL}</td>
            <td>{item.totalPercentPnL}%</td>
            <td className={cn('td-check-results')}>
              <CheckResultsButton
                text = {item.isBiggestTopicPooler? 'Hall of Honor' : 'Check Results'}
                primaryColor = {item.isBiggestTopicPooler ? 'BASE_RED_1' : item.status.toLowerCase() === 'ongoing' ? 'DARK_GRAY_5' : 'BASE_BLUE_1'}
                secondaryColor= 'BASE_CREAM_1' />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyDataTable;
