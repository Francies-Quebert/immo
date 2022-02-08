// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./address";
import propertyReducer from "./propertyReducer";

const reducers = combineReducers({ property: propertyReducer });
export default reducers;
