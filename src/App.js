import { createContext, useState } from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";

import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Application";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
//import MyJobs from "./component/recruiter/MyJobs";
import MyJobs from "./component/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplications";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <BrowserRouter basename="/">
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Routes >
              <Route  exact path="/"   element={<Welcome/>} />
              <Route exact  path="/login"   element={<Login/>} /> 
             
              <Route exact path="/signup"
                 element=  { <Signup />}
              />
              <Route exact path="/logout"
              element=  {  <Logout />}
              />
              <Route exact path="/home"
              element=  {    <Home />}
              />
              <Route exact path="/applications"
              element=  {       <Applications />}
              />
              <Route exact path="/profile"
          element=     {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
           />
              <Route exact path="/addjob"
              element=  {  <CreateJobs />}
             />
              <Route exact path="/myjobs"
              element=  {   <MyJobs />}
              />
              <Route exact path="/job/applications/:jobId"
              element=  {    <JobApplications />}
              />
              <Route exact path="/employees"
              element=  {      <AcceptedApplicants />}
              />
              {/* <Route>
                <ErrorPage />
              </Route> */}
            </Routes>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
