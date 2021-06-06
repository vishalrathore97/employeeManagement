import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { deleteUser, loadEditTrue } from "./../../Redux";
import "./UserInfo.css";

Modal.setAppElement("#root");

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }
  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };
  handleDelete = () => {
    this.props.deleteUser(this.props.user);
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };
  render() {
    const { user, loadEditTrue } = this.props;
    return (
      <div className="userInfo">
        <span className="userInfo__name">{user.name}</span>
        <div className="userInfo__btnContainer">
          <Link to={`/read/${user.id}`}>
            <button className="userInfo__btn userInfo__btn--blue ">View</button>
          </Link>
          <Link onClick={loadEditTrue} to={`/form/${user.id}`}>
            <button className="userInfo__btn userInfo__btn--yellow">
              Edit
            </button>
          </Link>
          <button
            onClick={this.toggleModal}
            className="userInfo__btn userInfo__btn--red"
          >
            Delete
          </button>
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.toggleModal}
            closeTimeoutMS={1000}
            className="modal"
            overlayClassName="overlay"
          >
            <h1 className="modal__title">WARNING!</h1>
            <p className="modal__body">
              Are you sure you want to delete this user?
            </p>
            <div className="modal__btn">
              <button
                onClick={this.handleDelete}
                className="modal__btn--danger"
              >
                Delete
              </button>
              <button
                onClick={this.toggleModal}
                className="modal__btn--primary"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { error: state.error };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (user) => dispatch(deleteUser(user)),
    loadEditTrue: () => dispatch(loadEditTrue()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
