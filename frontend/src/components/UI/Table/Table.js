import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const DataTable = (props) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {props.rows?.length && props.columns?.length ? <DataGrid {...props} /> : null}
    </div>
  );
};

export default DataTable;
