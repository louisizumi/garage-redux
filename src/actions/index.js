export const GET_CARS = 'GET_CARS';
export const CREATE_CAR = 'CREATE_CAR';
export const DELETE_CAR = 'DELETE_CAR';

const url = "https://wagon-garage-api.herokuapp.com";

const getCars = (garage) => {
  const promise = fetch(`${url}/${garage}/cars`)
    .then(r => r.json());

  return {
    type: GET_CARS,
    payload: promise
  };
};

const createCar = (garage, car, callback) => {
  const request = fetch(`${url}/${garage}/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  }).then(r => r.json())
    .then(() => callback());

  return {
    type: CREATE_CAR,
    payload: request
  };
};

const deleteCar = (id, callback) => {
  const promise = fetch(`${url}/cars/${id}`, {
    method: 'DELETE'
  }).then(r => r.json())
    .then(() => callback());

  return {
    type: DELETE_CAR,
    payload: promise
  };
};

export { getCars, createCar, deleteCar };
