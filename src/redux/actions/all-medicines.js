import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
// import { server } from "../../server";




// get all products
export const getAllMedicine = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { fetchDrugs } = useContext(AuthContext);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
