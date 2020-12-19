import React from "react";

import ViewIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


const ActionButtons = (props) => {

  const actionButtons =  props.roles.includes(props.type)
  ? (
      <>
        <IconButton color="inherit" onClick={() => props.handleView()}>
          <ViewIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => props.handleEdit()}>
          <EditIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => props.handleDelete(props.params.data.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    )
  : (
      <IconButton color="inherit" onClick={() => props.handleView()}>
        <ViewIcon />
      </IconButton>
    );
  return actionButtons;
};




export default ActionButtons;
