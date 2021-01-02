import { combineReducers } from "redux";

import fetchResult from "./Result";

const rootReducer = (history) =>
  combineReducers({
    result: fetchResult,
  });

export default rootReducer;
