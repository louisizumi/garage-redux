import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { createCar } from '../actions';

class CarsNew extends React.Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, () => {
      this.props.history.push('/'); // Navigate after submit
    });
  }

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
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <Field
                name="brand"
                type="text"
                component="input"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Model</label>
              <Field
                name="model"
                type="text"
                component="input"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Owner</label>
              <Field
                name="owner"
                type="text"
                component="input"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Plate</label>
              <Field
                name="plate"
                type="text"
                component="input"
                className="form-control"
              />
            </div>
            <button
              className="btn btn--submit"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
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
