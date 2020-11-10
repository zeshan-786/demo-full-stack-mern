import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID',  },
  { field: 'name', headerName: 'Full Name',  },
  { field: 'email', headerName: 'Email',  },
  { field: 'dob', headerName: 'Date of Birth',  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    
  },
];

const  DataTable= ( props ) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={props.rows} columns={columns} pageSize={props.pageSize}  />
    </div>
  );
}


export default DataTable