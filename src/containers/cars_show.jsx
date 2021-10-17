import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteCar } from '../actions';

class CarsShow extends React.Component {
  handleClick = () => {
    this.props.deleteCar(this.props.car.id, () => {
      this.props.history.push('/'); // Navigate after submit
    });
  }

  render() {
    const car = this.props.car;
    if (!car) {
      return (
        <div className="garage">
          <header className="garage__header">
            <h2>{this.props.garage}</h2>
            <Link to="/" className="btn btn--top-right btn--main">
              Back to cars
            </Link>
          </header>
        </div>
      );
    }

    return (
      <div className="garage">
        <header className="garage__header">
          <h2>{this.props.garage}</h2>
          <Link to="/" className="btn btn--top-right btn--main">
            Back to cars
          </Link>
        </header>
        <main className="garage__main">
          <div className="card-car">
            <img
              src={`https://source.unsplash.com/256x256/?${car.brand}?sig=${car.id}`}
              alt={`${car.brand} - ${car.model}`}
              className="card-car__image"
            />
            <div className="card-car__details">
              <h3>{car.brand} - {car.model}</h3>
              <p><strong>Owner: </strong>{car.owner}</p>
              <p><strong>Plate: </strong>{car.plate}</p>
            </div>
            <button className="btn btn--top-right btn--delete" onClick={this.handleClick}>
              Delete Car
            </button>
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { deleteCar },
    dispatch
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id, 10);
  return {
    garage: state.garage,
    car: state.cars.find(car => car.id === id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);
