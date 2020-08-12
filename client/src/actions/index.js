import axios from 'axios';
import { FETCH_USER } from './types';

// action creator care se foloseste de redux thunk
// cand se apeleaza fetchUser, reduxThunk ca middleware apeleaza functia pe care o returnam cu parametrul (dispatch), se va astepta rezultatul axios apoi se va face dispatch efectiv la actiune
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data }); // o sa primim acelasi model de user cu aceleasi data, dupa ce i-am s-a realizat plata
};
