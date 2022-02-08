import { combineReducers } from "@reduxjs/toolkit";
import propertyReducer from "./propertyReducer";

const reducers = combineReducers({ property: propertyReducer });
export default reducers;
