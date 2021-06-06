import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home/Home";
import { fetchUsers } from "./Redux";
import ReadUser from "./Components/ReadUser/ReadUser";
import UserForm from "./Components/UserForm/UserForm";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { loading, error } = this.props;
    return (
      <div className="app">
        <ToastContainer />
        {loading ? (
          <div className="app__loader">
            <ClipLoader size={100} />
          </div>
        ) : (
          <>
            {error ? (
              <div className="app__error">404 NOT FOUND</div>
            ) : (
              <Router>
                <Switch>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route
                    path="/read/:id"
                    render={(props) => <ReadUser {...props} />}
                  />
                  <Route
                    path="/form/:id"
                    render={(props) => <UserForm {...props} />}
                  />
                  <Redirect to="/home" />
                </Switch>
              </Router>
            )}
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { error: state.error, loading: state.loading };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
