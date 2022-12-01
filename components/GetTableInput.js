import { AgGridReact } from "ag-grid-react";

const GetTableInput = ({ cols, data, setData }) => {
  const onCellEditRequest = (event) => {
    const ddata = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newItem = { ...ddata };
    newItem[field] = event.newValue;
    console.log(ddata, field, newValue, newItem);
    const old_data = [...data];
    old_data = old_data.map((oldItem) =>
      oldItem.key == newItem.key ? newItem : oldItem
    );
    setData(old_data);
    console.log("success, data");
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "300px" }}>
      <AgGridReact
        onCellEditRequest={onCellEditRequest}
        rowData={data}
        columnDefs={cols}
        readOnlyEdit={true}
      ></AgGridReact>
    </div>
  );
};

export default GetTableInput;
