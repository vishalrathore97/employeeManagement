import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../Pagination/Pagination";
import { loadSaveTrue } from "./../../Redux";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { filteredData: [] };
  }
  debounceSearch = () => {
    let timer;
    return (args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        let search = args.target.value;
        if (search) {
          let regex = new RegExp("^" + search, "i");
          let filteredData = this.props.users.filter((m) => regex.test(m.name));
          if (!filteredData.length) {
            this.setState({ filteredData: "No Results Found" });
            return;
          }
          this.setState({ filteredData });
          return;
        }
        this.setState({ filteredData: this.props.users });
      }, 900);
    };
  };
  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.inputRef.current.value = "";
      this.setState({ filteredData: [] });
    }
  }
  render() {
    const { loading, users } = this.props;
    const { filteredData } = this.state;
    let debounce = this.debounceSearch();
    console.log(filteredData);
    return (
      <>
        {loading ? (
          <div className="home__loader">
            <ClipLoader size={100} />
          </div>
        ) : (
          <div className="home">
            <Link
              onClick={this.props.loadSaveTrue}
              to="/form/new"
              className="home__addBtn"
            >
              Add an Employee
            </Link>
            <input
              className="home__search"
              type="text"
              ref={this.inputRef}
              onChange={debounce}
            />
            {!users.length ? (
              <span className="home--noInfo">No Employee Information</span>
            ) : (
              <Pagination
                pageDataLimit={4}
                pageData={!filteredData.length ? users : filteredData}
                pageLimit={5}
              />
            )}
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { users: state.users, loading: state.loading };
};
const mapDispatchToProps = (dispatch) => {
  return { loadSaveTrue: () => dispatch(loadSaveTrue()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
