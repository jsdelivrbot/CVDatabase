import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/index";
import MethodLogger from "../util-decorators/logger";

@reduxForm(
  {
    validate,
    form: "PostsNewForm"
  }
)
@connect(
  null,
  { 
    createPost 
  }
)
class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  @MethodLogger(true)
  onSubmit(values) {
    this.props.createPost(values)
      .then(() => { this.props.history.push("/"); });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <br/>
      <h2>Add New Candidate</h2>
      <br/>
        <Field
          label="Vacancy:"
          name="vacancy"
          component={this.renderField}
        />
        <Field
          label="Name:"
          name="name"
          component={this.renderField}
        />
        <Field
          label="E-mail:"
          name="email"
          component={this.renderField}
        />
        <Field
          label="Mobile:"
          name="mobile"
          component={this.renderField}
        />
        <Field
          label="Skills:"
          name="skills"
          component={this.renderField}
        />
        <br/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.vacancy) {
    errors.title = "Enter a vacancy";
  }
  if (!values.name) {
    errors.categories = "Enter a name";
  }
  if (!values.email) {
    errors.content = "Enter an email";
  }
  if (!values.mobile) {
    errors.content = "Enter a mobile";
  }
  if (!values.skills) {
    errors.content = "Enter some skills";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default PostsNew;
