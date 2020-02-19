import Config from '../../secrets/config';

const SIGN_UP = 'SIGN_UP';

export const signUp = (email, password) => {
  return async dispatch => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Config.firebase_Web_API_Key}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });
    
    if(!response.ok) {
      const res = await response.json();      
      throw new Error(`Error code: ${res.error.code} Error Message: ${res.error.message}`);
    }
    
    const resData = await response.json();     
    console.log(resData);
    
    dispatch({type: SIGN_UP});
  }
}
