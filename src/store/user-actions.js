import jwt from 'jwt-decode';

import { userActions } from './user-slice';

let logoutTimer;

const calculateRemainingTime = (expires) => {
  // JWT time is in seconds, convert to miliseconds (*1000)
  const expirationTime = new Date(expires * 1000).getTime();
  const currentTime = new Date().getTime();
  // Calculate remaining time in seconds (divide by 1000)
  const remainingTime = (expirationTime - currentTime) / 1000;
  return remainingTime;
};

export const loginUser = (token) => {
  return (dispatch) => {
    const tokenData = jwt(token);
    // Save session to local storage
    localStorage.setItem('token', token);
    // Start session timer
    logoutTimer = setTimeout(logoutUser, calculateRemainingTime(tokenData.exp));
    // Dispatch action to update app state
    dispatch(
      userActions.login({
        id: tokenData.sub,
        email: tokenData.email,
        expires: tokenData.exp,
        logoutTimer,
      })
    );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // Clear session from local storage
    localStorage.removeItem('token');
    // Clear session timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    // Dispatch action to update app state
    dispatch(userActions.logout());
  };
};

export const initStorageSession = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = jwt(token);
      const remainingTime = calculateRemainingTime(tokenData.exp);

      if (remainingTime <= 60) {
        // remainingTime is less than 60 seconds, clear session
        localStorage.removeItem('token');
      } else {
        // remainingTime is greater than 60 seconds, load session from storage
        // Dispatch action to update app state
        dispatch(
          userActions.login({
            id: tokenData.sub,
            email: tokenData.email,
            expires: tokenData.exp,
          })
        );
      }
    }
  };
};
