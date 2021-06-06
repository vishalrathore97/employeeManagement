import React, { Component } from "react";
import { connect } from "react-redux";
import "./ReadUser.css";
import ClipLoader from "react-spinners/ClipLoader";

class ReadUser extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ loading: false });
    }, 900);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  getAddress = () => {
    const { street, suite, city, zipcode } = this.props.user.address;
    return `${suite}, ${street}, ${city}, zipcode-${zipcode} `;
  };
  render() {
    if (!Object.keys(this.props.user).length) {
      this.props.history.replace("/home");
      return null;
    }
    const { loading } = this.state;
    const { name, email, username, phone } = this.props.user;
    return (
      <div className="readUser">
        {loading ? (
          <ClipLoader size={100} />
        ) : (
          <div className="readUser__card">
            <button
              onClick={() => this.props.history.push("/home")}
              className="readUser_back"
            >
              &lt; Back
            </button>
            <div className="readUser__info">
              <div className="readUser__info__col1">NAME : </div>
              <div className="readUser__info__col2">{name}</div>
            </div>
            <div className="readUser__info">
              <div className="readUser__info__col1">EMAIL : </div>
              <div className="readUser__info__col2">{email}</div>
            </div>
            <div className="readUser__info">
              <div className="readUser__info__col1">USERNAME : </div>
              <div className="readUser__info__col2">{username}</div>
            </div>
            <div className="readUser__info">
              <div className="readUser__info__col1">ADDRESS : </div>
              <div className="readUser__info__col2">{this.getAddress()}</div>
            </div>
            <div className="readUser__info">
              <div className="readUser__info__col1">CONTACT NO : </div>
              <div className="readUser__info__col2">{phone}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.match;
  return {
    user: { ...state.users.find((user) => user.id === Number(params.id)) },
  };
};
export default connect(mapStateToProps)(ReadUser);
