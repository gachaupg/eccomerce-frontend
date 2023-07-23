import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import TourReducer from "../slices/productsSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});
