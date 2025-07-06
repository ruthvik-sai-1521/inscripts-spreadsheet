import React from "react";
import {
  useTable,
  type Column,
  useBlockLayout,
  useResizeColumns,
  type HeaderGroup,
  type ColumnInstance,
} from "react-table";
import "./SpreadsheetTable.css";

// Define the row structure
type Person = {
  name: string;
  age: number;
  email: string;
  country: string;
};

// Column definitions
const defaultColumns: Column<Person>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Country",
    accessor: "country",
  },
];

// Sample data
const defaultData: Person[] = [
  { name: "Alice", age: 25, email: "alice@example.com", country: "India" },
  { name: "Bob", age: 30, email: "bob@example.com", country: "USA" },
  { name: "Charlie", age: 22, email: "charlie@example.com", country: "Canada" },
  { name: "Diana", age: 28, email: "diana@example.com", country: "Germany" },
];

const SpreadsheetTable = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: defaultColumns,
        data: defaultData,
      },
      useBlockLayout,
      useResizeColumns
    );

  return (
    <div className="overflow-auto border rounded text-sm font-medium text-gray-800">
      <div {...getTableProps()} className="table w-full">
        <div>
          {headerGroups.map((headerGroup: HeaderGroup<Person>) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              className="table-row bg-gray-100 border-b"
            >
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  className="table-cell font-semibold px-4 py-2 border-r relative group"
                >
                  {column.render("Header")}
{"getResizerProps" in column && (
  <div
    {...(column as ColumnInstance<Person> & {
      getResizerProps: () => React.HTMLAttributes<HTMLDivElement>;
    }).getResizerProps()}
    className="resizer absolute right-0 top-0 h-full w-1 bg-blue-400 opacity-0 group-hover:opacity-100 cursor-col-resize"
  />
)}

                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="table-row hover:bg-gray-50">
                {row.cells.map((cell) => (
                  <div
                    {...cell.getCellProps()}
                    className="table-cell px-4 py-2 border-r border-t"
                  >
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetTable;
