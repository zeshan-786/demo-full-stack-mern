import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const  DataTable= ( props ) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={props.rows} columns={props.columns} pageSize={props.pageSize}  />
    </div>
  );
}


export default DataTable