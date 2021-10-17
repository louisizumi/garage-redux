import { GET_CARS, DELETE_CAR } from '../actions';

const CarsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CARS:
      return action.payload;
    case DELETE_CAR:
      return state.filter(car => car !== action.payload);
    default:
      return state;
  }
};

export default CarsReducer;
