// ############################################## NOTICE ##############################################
// This custom hook was built for react-date-picker: https://github.com/wojtekmaj/react-date-picker
// ####################################################################################################
import { useReducer } from 'react';

const initialState = {
  isValid: false,
  isTouched: false,
};

const datepickerStateReducer = (state, action) => {
  if (action.type === 'CHANGE') {
    return {
      value: action.payload.value,
      isValid: action.payload.isValid,
      isTouched: state.isTouched,
    };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isValid: state.isValid, isTouched: true };
  }
  if (action.type === 'VALIDATE') {
    return {
      value: state.value,
      isValid: action.payload.isValid,
      isTouched: true,
    };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: false, isTouched: false };
  }
  return initialState;
};

const useDatepicker = (initialValue, validateInput) => {
  const [state, dispatch] = useReducer(datepickerStateReducer, {
    ...initialState,
    value: initialValue,
  });

  const hasError = !state.isValid && state.isTouched;

  const onChangeHandler = (value) => {
    dispatch({
      type: 'CHANGE',
      payload: {
        value: value,
        isValid: validateInput(value),
      },
    });
  };

  const validateHandler = () => {
    console.log(state.value);
    dispatch({
      type: 'VALIDATE',
      payload: { isValid: validateInput(state.value) },
    });
  };

  const onBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const onResetHandler = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: state.value,
    isValid: state.isValid,
    isTouched: state.isTouched,
    hasError,
    onChange: onChangeHandler,
    onBlur: onBlurHandler,
    validate: validateHandler,
    reset: onResetHandler,
  };
};

export default useDatepicker;
