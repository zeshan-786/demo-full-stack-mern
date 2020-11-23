import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
// import { XGrid } from '@material-ui/x-grid';

const DataTable = (props) => {
  const id = [{ field: "id", headerName: "ID" }];
  const timeStamps = [
    { field: "createdAt", headerName: "Created" },
    { field: "updatedAt", headerName: "Updated" },
  ];

  props = {
    ...props,
    columns: [...id, ...props.columns, ...timeStamps],
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {props.rows?.length && props.columns?.length ? <DataGrid {...props} /> : null}
    </div>
  );
};

export default DataTable;
