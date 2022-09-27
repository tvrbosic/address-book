import { userActions } from './user-slice';

export const login = (email, token) => {
  return (dispatch) => {
    // Save session to local storage
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    dispatch(userActions.login({ email, token }));
  };
};

export const logout = () => {
  return (dispatch) => {
    // Clear session from local storage
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    dispatch(userActions.logout());
  };
};

export const initializeStoredSession = () => {
  return (dispatch) => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      dispatch(userActions.login({ email, token }));
    }
  };
};
