import React from "react";
import SpreadsheetTable from "./SpreadsheetTable";

const SpreadsheetLayout = () => {
  const handleTabClick = (tabName: string) => {
    console.log(`Tab clicked: ${tabName}`);
  };

  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center shadow-sm">
        <div className="font-semibold text-lg text-gray-800">Spreadsheet</div>
        <div className="flex gap-2">
          <button
            onClick={() => handleButtonClick("share")}
            className="px-4 py-1.5 bg-white border rounded-md text-sm font-medium shadow-sm hover:bg-gray-100"
          >
            Share
          </button>
          <button
            onClick={() => handleButtonClick("save")}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b px-6 py-2 flex gap-2 text-sm font-medium text-gray-700">
        <button
          onClick={() => handleTabClick("Sheet 1")}
          className="px-4 py-1.5 rounded-md bg-blue-100 text-blue-600"
        >
          Sheet 1
        </button>
        <button
          onClick={() => handleTabClick("Sheet 2")}
          className="px-4 py-1.5 rounded-md hover:bg-gray-100"
        >
          Sheet 2
        </button>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-6">
        <div className="border rounded-lg bg-white shadow-sm p-2 min-w-[900px]">
          <SpreadsheetTable />
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetLayout;
