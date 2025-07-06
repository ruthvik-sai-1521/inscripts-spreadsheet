// src/components/SpreadsheetTable.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  useTable,
  type Column,
  useBlockLayout,
  useResizeColumns,
  type HeaderGroup,
  type ColumnInstance,
} from "react-table";
import "./SpreadsheetTable.css";

// Define row type
type Person = {
  name: string;
  age: number;
  email: string;
  country: string;
};

// All columns definition
const ALL_COLUMNS: Column<Person>[] = [
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
  const [visibleColumns, setVisibleColumns] = useState<Column<Person>[]>(ALL_COLUMNS);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: visibleColumns,
      data: defaultData,
    },
    useBlockLayout,
    useResizeColumns
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        setSelectedCell((prev) => {
          let next = { ...prev };
          if (e.key === "ArrowUp") next.row = Math.max(prev.row - 1, 0);
          if (e.key === "ArrowDown") next.row = Math.min(prev.row + 1, rows.length - 1);
          if (e.key === "ArrowLeft") next.col = Math.max(prev.col - 1, 0);
          if (e.key === "ArrowRight") next.col = Math.min(prev.col + 1, visibleColumns.length - 1);
          return next;
        });
      }
    },
    [rows.length, visibleColumns.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="overflow-auto border rounded text-sm font-medium text-gray-800">
      <div className="p-2 bg-gray-50 border-b flex gap-4">
        {ALL_COLUMNS.map((col) => (
          <label key={col.accessor?.toString()} className="text-sm">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col)}
              onChange={(e) => {
                if (e.target.checked) {
                  setVisibleColumns((prev) => [...prev, col]);
                } else {
                  setVisibleColumns((prev) =>
                    prev.filter((c) => c.accessor !== col.accessor)
                  );
                }
              }}
              className="mr-1"
            />
            {typeof col.Header === "string" ? col.Header : col.id}
          </label>
        ))}
      </div>

      <div {...getTableProps()} className="table w-full">
        <div>
          {headerGroups.map((headerGroup: HeaderGroup<Person>) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              className="table-row bg-gray-100 border-b"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  className="table-cell font-semibold px-4 py-2 border-r relative group"
                  key={column.id}
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
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="table-row hover:bg-gray-50" key={row.id}>
                {row.cells.map((cell, colIndex) => {
                  const isSelected = rowIndex === selectedCell.row && colIndex === selectedCell.col;
                  return (
                    <div
                      {...cell.getCellProps()}
                      className={`table-cell px-4 py-2 border-r border-t ${
                        isSelected ? "bg-blue-100 outline outline-1 outline-blue-500" : ""
                      }`}
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetTable;
