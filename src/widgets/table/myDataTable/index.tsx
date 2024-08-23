import React from 'react';
import styles from '@/widgets/table/myDataTable/MyDataTable.module.scss';
import classNames from 'classnames/bind';
import CheckResultsButton from '@/components/common/button/checkResultsButton';
import StatusBar from '@/widgets/bar/statusBar';

const cn = classNames.bind(styles);

type TableRow = {
  name: string;
  status: string;
  schedule: string;
  pooledIn: string;
  pnlDollars: string;
  pnlPercent: string;
  checkResults: string;
};

type MyDataTableProps = {
  data: TableRow[];
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
              <a href="" className={cn('link')}>
               {item.name}
              </a>
            </td>
            <td>
              <StatusBar
                label = {item.status}
                />
            </td>
            <td>{item.schedule}</td>
            <td>{item.pooledIn}</td>
            <td>{item.pnlDollars}</td>
            <td>{item.pnlPercent}</td>
            <td className={cn('td-check-results')}>
              <CheckResultsButton
                text = {item.checkResults}
                primaryColor = {item.checkResults.toLowerCase() === 'hall of honor' ? 'BASE_RED_1' : item.status.toLowerCase() === 'ongoing' ? 'DARK_GRAY_5' : 'BASE_BLUE_1'}
                secondaryColor= 'BASE_CREAM_1' />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyDataTable;
