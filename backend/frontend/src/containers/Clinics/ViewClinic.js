import React from "react";
import ContentView from "../../components/UI/ContentView/ContentView";

import { connect } from "react-redux";
import ViewUser from "../../components/Profile/ViewUser";


const ViewClinic = (props) => {

  const goToEdit = () => {
    props.history.push("addUser");
  };
  return (
    <ContentView>
      <ViewUser user={props.clinic} goToEdit={goToEdit} />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic.selectedClinic,
  };
};

export default connect(mapStateToProps)(ViewClinic);