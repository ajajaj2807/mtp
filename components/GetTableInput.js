import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import styles from "../styles/GetTableInput.module.css";

// limits
const config = {
  "Pan Evaporation Rate (mm/day)": [0, 40],
  "Max Temp (C)": [15, 65],
  "Min Temp (C)": [0, 50],
  "Max RH": [0, 100],
  "Min RH": [0, 100],
  "Mean Temp (C)": [10, 65],
  "Relative Humidity": [0, 100],
  "Hourly Wind Speed": [0, 20],
  "Daily Wind Speed": [0, 20],
  "Monthly Wind Speed": [0, 20],
  "Wind Speed (m/s)": [0, 20],
  "Height (m)": [0, 50],
  "Solar Radiation (Rs)": [0, 100],
  "Avg Min Temp (C)": [5, 50],
  "Avg Max Temp (C)": [10, 65],
  "Actual Vapour Pressure": [0, 100],
  "PE (mm/day)": [0, 40],
};

const GetTableInput = (props) => {
  const [values, setValues] = useState(props.data);
  useEffect(() => {
    if (props.data) return;
    const newData = Array.from({ length: props.n }, () =>
      props.variables.reduce((obj, variable) => {
        obj[variable] = 0;
        return obj;
      }, {})
    );
    setValues(newData);
  }, [props.n, props.variables, props.data]);

  const handleCellValueChanged = (params) => {
    const newValues = [...values];
    newValues[params.rowIndex] = {
      ...newValues[params.rowIndex],
      [params.column.colId]: params.newValue,
    };
    setValues(newValues);
    props.onChange(newValues);
  };

  const columnDefs = props.variables.map((variable) => ({
    headerName: variable,
    field: variable,
    editable: true,
  }));

  const gridOptions = {
    cellEditable: true,
  };

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const getErrors = () => {
    let err = [];
    props?.data?.forEach((row) => {
      for (const [name, value] of Object.entries(row)) {
        const val = Number(value);
        if (!val) {
          continue;
        }
        if (config[name][0] <= val && val <= config[name][1]) {
          continue;
        } else {
          err.push(
            `Invalid input for "${name}" detected. Got: ${val}, Expected: [${config[name][0]}, ${config[name][1]}]`
          );
        }
      }
    });
    return err;
  };

  const errors = getErrors();

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
          onGridReady={onGridReady}
        />
      </div>
      {errors.length > 0 && (
        <div className={styles.errorWrapper}>
          Errors:
          {errors.map((err) => (
            <span className={styles.singleError} key={err}>
              {err}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetTableInput;
