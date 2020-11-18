import * as React from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { XGrid } from '@material-ui/x-grid';

const DataTable = (props) => {
  const id = [{ field: "id", headerName: "ID" }];
  const timeStamps = [
    { field: "createdAt", headerName: "Created" },
    { field: "updatedAt", headerName: "Updated" },
  ];

  const columns = [...id, ...props.columns, ...timeStamps];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <XGrid
        rows={props.rows}
        columns={columns.map((item) => {
          return { ...item, resizable: true };
        })}
        pageSize={props.pageSize}
      />
    </div>
  );
};

export default DataTable;
