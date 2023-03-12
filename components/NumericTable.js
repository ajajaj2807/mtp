import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { Button } from "baseui/button";
import Chart from "./Chart";

const NumericTable = ({ data }) => {
  const columnDefs = [{ headerName: "Value", field: "value" }];
  const [isOpen, setIsOpen] = useState(false);
  const rowData = data.map((value, index) => ({ value, id: index }));
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "70vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
      />
      <Button onClick={() => setIsOpen(true)}>Plot</Button>
      {isOpen && (
        <Chart onClose={() => setIsOpen(false)} data={data} isOpen={isOpen} />
      )}
    </div>
  );
};

export default NumericTable;
