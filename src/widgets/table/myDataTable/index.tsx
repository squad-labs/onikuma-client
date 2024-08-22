import React from 'react';
import styles from '@/widgets/table/myDataTable/MyDataTable.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type TableRow = {
    name: string;
    status: string;
    schedule: string;
    pooledIn: string;
    pnlDollars: string;
    pnlPercent: string;
    checkResults: string;
}

type MyDataTableProps = {
    data: TableRow[];
};

const MyDataTable = ({
    data
}:MyDataTableProps) => {
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
                {data.map((item,index) => (
                    <tr key={index}>
                        <td className={cn('td-name')}>{item.name}</td>
                        <td><button>{item.status}</button></td>
                        <td>{item.schedule}</td>
                        <td>{item.pooledIn}</td>
                        <td>{item.pnlDollars}</td>
                        <td>{item.pnlPercent}</td>
                        <td><button>{item.checkResults}</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MyDataTable;


