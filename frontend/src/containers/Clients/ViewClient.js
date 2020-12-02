import React from "react";
import ContentView from "../../components/UI/ContentView/ContentView";

import { connect } from "react-redux";
import ViewUser from "../../components/Profile/ViewUser";


const ViewClient = (props) => {

  const goToEdit = () => {
    props.history.push("addUser");
  };
  return (
    <ContentView>
      <ViewUser user={props.client} goToEdit={goToEdit} />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    client: state.client.selectedClient,
  };
};

export default connect(mapStateToProps)(ViewClient);
