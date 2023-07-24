import axios from "axios";

const server = "http://localhost";

export const loadUser = () => async (dispatch) => {
    console.log('hey loader');
  try {
    // Dispatch the "LoadUser" action to set the loading state to true
    dispatch({ type: "LoadUser" });

    // Make the API call to fetch user data
    const response = await axios.get(`${server}/api/user`);

    // If the response is successful, dispatch the "LoadUserSuccess" action with the user data
    dispatch({ type: "LoadUserSuccess", payload: response.data });

    // Note: Replace 'api/user' with the actual endpoint to fetch user data from your server
    // The response.data should be the user data received from the server
  } catch (error) {
    // If there's an error, dispatch the "LoadUserFailure" action
    dispatch({ type: "LoadUserFailure" });
  }
};
