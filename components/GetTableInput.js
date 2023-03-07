import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

const GetTableInput = (props) => {
  const initialData = useMemo(() => props.data, [props.data]);
  const [values, setValues] = useState(initialData);

  useEffect(() => {
    const newData = Array.from({ length: props.n }, () =>
      props.variables.reduce((obj, variable) => {
        obj[variable] = 0;
        return obj;
      }, {})
    );
    setValues(newData);
  }, [props.n, props.variables]);

  const handleCellValueChanged = (params) => {
    const newValues = [...values];
    newValues[params.rowIndex] = {
      ...newValues[params.rowIndex],
      [params.column.colId]: params.newValue
    };
    setValues(newValues);
    props.onChange(newValues);
  };

  const columnDefs = props.variables.map((variable) => ({
    headerName: variable,
    field: variable,
    editable: true
  }));

  const gridOptions = {
    cellEditable: true
  };

  return (
    <div>
      <div>
        <b>{props.title}</b>
      </div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 500, height: 300 }}>
        <AgGridReact
          gridOptions={gridOptions}
          rowData={values} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
    </div>
  );
};

export default GetTableInput;
