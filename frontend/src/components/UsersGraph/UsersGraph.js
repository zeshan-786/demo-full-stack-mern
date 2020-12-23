import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

const UsersGraph = (props) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    let data = [];
    const { clients, admins, doctors, clinics } = props;
    if (clients?.length)
      data.push({ __userType: "Client", count: clients?.length });
    if (admins?.length)
      data.push({ __userType: "Admin", count: admins?.length });
    if (clinics?.length)
      data.push({ __userType: "Clinic", count: clinics?.length });
    if (doctors?.length)
      data.push({ __userType: "Doctor", count: doctors?.length });
    setChartData(data);
  }, []);

  return (
    <BarChart
      style={{ margin: "0 auto" }}
      width={1000}
      height={360}
      data={chartData}
    >
      <XAxis dataKey="__userType" name="User Type" stroke="#3f51b5">
        <Label
          value="User Type"
          offset={-3}
          stroke="#3f51b5"
          position="insideBottom"
        />
      </XAxis>
      <YAxis
        label={{
          value: "Number of Users",
          offset: 20,
          angle: -90,
          position: "insideLeft",
          fill: "#3f51b5",
        }}
      />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
      {/* <ReferenceLine y={5} label="Full Rating" stroke="green"/> */}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar
        dataKey="count"
        label={{ fill: "white", fontSize: 16 }}
        name="User Type"
        fill="#3f51b5"
        barSize={40}
      ></Bar>
    </BarChart>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.admin.loading,
    error: state.admin.error,
    admins: state.admin.admins,
    doctors: state.doctor.doctors,
    clients: state.client.clients,
    clinics: state.clinic.clinics,
  };
};

export default connect(mapStateToProps)(withRouter(UsersGraph));
