import React from "react";
import ContentView from "../../components/UI/ContentView/ContentView";

import { connect } from "react-redux";
import ViewUser from "../../components/Profile/ViewUser";


const ViewDoctor = (props) => {

  const goToEdit = () => {
    props.history.push("addUser");
  };
  return (
    <ContentView>
      <ViewUser user={props.doctor} goToEdit={goToEdit} />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    doctor: state.doctor.selectedDoctor,
  };
};

export default connect(mapStateToProps)(ViewDoctor);