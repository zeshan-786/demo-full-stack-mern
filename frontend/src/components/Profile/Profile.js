import React from "react";
import ContentView from "../UI/ContentView/ContentView";

import { connect } from "react-redux";
import ViewUser from "./ViewUser";

const Profile = (props) => {

  const goToEdit = () => {
    props.history.push("editProfile");
  };
  return (
    <ContentView>
      <ViewUser user={props.user} goToEdit={goToEdit} />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
