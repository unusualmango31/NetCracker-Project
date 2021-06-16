import { createReducer, on } from "@ngrx/store";
import {
    getUserData,
    getUserDataFail,
    getUserDataSuccess,
    updateUserSuccess,
    userLogout,
} from "../actions/user.action";
import { initialUserState, UserState } from "../state/user.state";

export const userReducer = createReducer(
    initialUserState,
    on(getUserData, (state ): UserState => ({
        ...state,
    })),
    on(getUserDataSuccess, (state, { userData } ): UserState => ({
        ...state,
        userData,
        errors: "",
    })),
    on(getUserDataFail, (state, { errors }): UserState => ({
        ...state,
        userData: null,
        errors
    })),
    on(userLogout, (state): UserState => ({
        ...state,
        userData: null,
        errors: null,
    })),
    on(updateUserSuccess, (state, { userData }): UserState => ({
        ...state,
        userData,
        errors: null,
    })),
);
