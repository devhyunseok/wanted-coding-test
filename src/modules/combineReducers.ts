import {combineReducers} from "redux";
import { connectRouter } from 'connected-react-router';
import jobListReducer from "./jobListReducer";
import jobFilterReducer from "./jobFilterReducer";

const createRootReducer = (history:any) => combineReducers({
  jobs: jobListReducer,
  jobFilter: jobFilterReducer,
  router: connectRouter(history),
});

export default createRootReducer