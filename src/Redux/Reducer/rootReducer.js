import { combineReducers } from "redux";
import { TripReducer } from "./TripReducer";
import { UserReducer } from "./UserReducer";

export const RootReducer = combineReducers({
    UserInfo: UserReducer,
    TripInfo: TripReducer
})