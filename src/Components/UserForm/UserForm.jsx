import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  saveUser,
  editUser,
  loadSaveFalse,
  loadEditFalse,
} from "./../../Redux";
import ClipLoader from "react-spinners/ClipLoader";
import "./UserForm.css";
import TextError from "./TextError";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email format"),
  username: Yup.string().required("Required"),
  address: Yup.object({
    street: Yup.string().required("Required"),
    suite: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    zipcode: Yup.string()
      .trim()
      .matches(/^\d{5}$|^\d{5}-\d{4}$/, "Invalid format")
      .required("Required"),
  }),
  phone: Yup.string().required("Required"),
});

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      name: "",
      email: "",
      username: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      phone: "",
    };
    if (Object.keys(props.user).length) {
      this.initialValues = {
        name: props.user.name,
        email: props.user.email,
        username: props.user.username,
        address: {
          street: props.user.address.street,
          suite: props.user.address.suite,
          city: props.user.address.city,
          zipcode: props.user.address.zipcode,
        },
        phone: props.user.phone,
      };
    }
  }
  componentDidMount() {
    const { loadSaveFalse, loadEditFalse, user, match, history } = this.props;
    setTimeout(() => {
      loadEditFalse();
      loadSaveFalse();
    }, 800);
    if (match.params.id === "new") return;
    if (!Object.keys(user).length) {
      history.replace("/home");
      return;
    }
  }
  handleSubmit = (values) => {
    if (Object.keys(this.props.user).length) {
      const data = { ...this.props.user, ...values };
      this.props.editUser(data);
      return;
    }
    this.props.saveUser(values);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.props.history.replace("/home");
    }
  }

  render() {
    return (
      <div className="userForm">
        {this.props.loadSave || this.props.loadEdit ? (
          <ClipLoader className="userForm__loader" size={100} />
        ) : (
          <Formik
            initialValues={this.initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
          >
            <div className="userForm__container">
              <h1>USER FORM</h1>
              <Form>
                <div className="userForm__inputGroup">
                  <label htmlFor="name">Name</label>
                  <div className="userForm__col">
                    <Field id="name" type="text" name="name" />
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="email">Email</label>
                  <div className="userForm__col">
                    <Field id="email" type="email" name="email" />
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="username">Username</label>
                  <div className="userForm__col">
                    <Field id="username" type="text" name="username" />
                    <ErrorMessage name="username" component={TextError} />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="street">Street</label>
                  <div className="userForm__col">
                    <Field id="street" type="text" name="address.street" />
                    <ErrorMessage name="address.street" component={TextError} />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="city">City</label>
                  <div className="userForm__col">
                    <Field id="city" type="text" name="address.city" />
                    <ErrorMessage name="address.city" component={TextError} />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="suite">Suite</label>
                  <div className="userForm__col">
                    <Field id="suite" type="text" name="address.suite" />
                    <ErrorMessage name="address.suite" component={TextError} />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="zipcode">Zipcode</label>
                  <div className="userForm__col">
                    <Field id="zipcode" type="text" name="address.zipcode" />
                    <ErrorMessage
                      name="address.zipcode"
                      component={TextError}
                    />
                  </div>
                </div>
                <div className="userForm__inputGroup">
                  <label htmlFor="phone">Contact No.</label>
                  <div className="userForm__col">
                    <Field id="phone" type="text" name="phone" />
                    <ErrorMessage name="phone" component={TextError} />
                  </div>
                </div>
                <button className="userForm__submitBtn" type="submit">
                  Submit
                </button>
              </Form>
            </div>
          </Formik>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.match;
  return {
    users: state.users,
    loadSave: state.loadSave,
    loadEdit: state.loadEdit,
    user: { ...state.users.find((user) => user.id === Number(params.id)) },
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadEditFalse: () => dispatch(loadEditFalse()),
    loadSaveFalse: () => dispatch(loadSaveFalse()),
    saveUser: (user) => dispatch(saveUser(user)),
    editUser: (user) => dispatch(editUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
