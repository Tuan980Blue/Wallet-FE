import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import StatusDot from '../StatusDot.jsx';
import {formatCurrency} from '../../util/currency.util.js';
import {transactionType} from '../../util/status.util.js';

function TransactionTable({list}) {
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();
  const [sorting, setSorting] = useState();

  const columns = [
    columnHelper.accessor('id', {
      header: 'Mã giao dịch',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('flowType', {
      header: 'Loại giao dịch',
      cell: (info) => transactionType[info.getValue()],
    }),
    columnHelper.accessor('amount', {
      header: 'Số tiền',
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('created', {
      header: 'Thời gian tạo',
      cell: (info) => new Date(info.getValue()).toLocaleDateString('vi-VN'),
    }),
    columnHelper.accessor('status', {
      header: 'Trạng thái',
      cell: (info) => StatusDot({status: info.getValue()}),
    }),
  ];

  const tableInstance = useReactTable({
    data: list || [],
    columns,
    state: sorting,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
  });

  function redirectToTransactionDetail(id) {
    navigate(`/transaction/${id}`);
  }

  return (
      <div className={'w-full rounded-lg overflow-hidden border border-gray-500'}>
        <table className="w-full table-fixed bg-white">
          <thead className="bg-orange-50 text-black text-center border-b border-gray-400">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th
                        key={header.id}
                        className="py-4 cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                ))}
              </tr>
          ))}
          </thead>
          <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
              <tr
                  key={row.id}
                  onClick={() => redirectToTransactionDetail(row.original.id)}
                  className="hover:bg-gray-100 text-center"
              >
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 cursor-pointer">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default TransactionTable;
