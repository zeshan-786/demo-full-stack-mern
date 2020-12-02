import React from "react";
import ContentView from "../../components/UI/ContentView/ContentView";

import { connect } from "react-redux";
import ViewUser from "../../components/Profile/ViewUser";


const ViewAdmin = (props) => {

  const goToEdit = () => {
    props.history.push("addUser");
  };
  return (
    <ContentView>
      <ViewUser user={props.admin} goToEdit={goToEdit} />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin.selectedAdmin,
  };
};

export default connect(mapStateToProps)(ViewAdmin);
