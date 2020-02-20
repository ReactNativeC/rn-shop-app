import Config from '../../secrets/config';

const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';

export const signUp = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Config.firebase_Web_API_Key}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(processError(res.error.message));
      }

      const resData = await response.json();
      console.log(resData);

      dispatch({ type: SIGN_UP });
    } catch (err) {
      throw err;
    }
  }
}

export const signIn = (email, password) => {
  return async dispatch => {
    try {   
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Config.firebase_Web_API_Key}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        });
        
      if (!response.ok) {
        const res = await response.json();        
        throw new Error(processError(res.error.message));
      }

      const resData = await response.json();     

      dispatch({ type: SIGN_IN });
    } catch (err) {
     
      throw err;
    }
  }
}

const processError = (error) => {  
  let errorMessage = '';  
  switch(error) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';     
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email is not registered. pleas switch to sign up!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.'
      break;
    default:      
      errorMessage = error
      break;
  }

  return errorMessage;
}