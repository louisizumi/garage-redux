import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { createCar } from '../actions';

const required = (value) => {
  return value ? undefined : '* Required';
};

const validPlate = (value) => {
  return !/[A-Z0-9]+/.test(value) ? 'Plate number must be allcaps and contain only the characters A-Z 0-9' : undefined;
};

class CarsNew extends React.Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, () => {
      this.props.history.push('/'); // Navigate after submit
    });
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
      <label htmlFor={input}>{label}</label>
      <div className="form-control">
        <input {...input} type={type} placeholder={label} />
        <p className="form-validation">
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </p>
      </div>
    </div>
  )

  render() {
    return (
      <div className="garage">
        <header className="garage__header">
          <h2>{this.props.garage}</h2>
          <Link to="/" className="btn btn--top-right btn--main">
            Back to cars
          </Link>
        </header>
        <main className="garage__main">
          <form className="form-car" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="brand"
              label="Brand"
              type="text"
              component={this.renderField}
              validate={required}
            />
            <Field
              name="model"
              label="Model"
              type="text"
              component={this.renderField}
              validate={required}
            />
            <Field
              name="owner"
              label="Owner"
              type="text"
              component={this.renderField}
              validate={required}
            />
            <Field
              name="plate"
              label="Plate"
              type="text"
              component={this.renderField}
              validate={[required, validPlate]}
            />
            <button
              className="btn btn--submit"
              type="submit"
              disabled={this.props.submitting}
            >
              Add Car
            </button>
          </form>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    garage: state.garage
  };
};

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { createCar })(CarsNew)
);
