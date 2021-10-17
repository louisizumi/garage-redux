import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCars } from '../actions';

class CarsIndex extends React.Component {
  componentWillMount() {
    this.props.getCars(this.props.garage);
  }

  render() {
    if (this.props.cars.length === 0) {
      return (
        <div className="garage">
          <header className="garage__header">
            <h2>{this.props.garage}</h2>
            <Link to="/cars/new" className="btn btn--top-right btn--main">
              Add a car
            </Link>
          </header>
          <main className="garage__main garage__main--columns">
            No cars... yet!
          </main>
        </div>
      );
    }

    return (
      <div className="garage">
        <header className="garage__header">
          <h2>{this.props.garage}</h2>
          <Link to="/cars/new" className="btn btn--top-right btn--main">
            Add a car
          </Link>
        </header>
        <main className="garage__main">
          <ul className="list-columns">
            {
              this.props.cars.map((car) => {
                return (
                  <li key={car.id}>
                    <Link to={`/cars/${car.id}`} className="card-car__link">
                      <div className="card-car">
                        <img
                          src={`https://source.unsplash.com/128x128/?car?sig=${car.id}`}
                          alt={`${car.brand} - ${car.model}`}
                          className="card-car__image"
                        />
                        <div className="card-car__details">
                          <h3>{car.brand} - {car.model}</h3>
                          <p><strong>Owner: </strong>{car.owner}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getCars },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    garage: state.garage,
    cars: state.cars
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
