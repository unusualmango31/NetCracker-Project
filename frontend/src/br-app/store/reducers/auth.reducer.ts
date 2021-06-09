import { createReducer, on } from "@ngrx/store";
import { AuthState, initaialAuthState } from "../state/auth.state";
import {
    formRedirect,
    login,
    loginFailed,
    loginSuccess, logoutSuccess,
    signUp,
    signUpFailed,
    signUpSuccess,
} from "../actions/auth.action";

export const authReducer = createReducer(
    initaialAuthState,
    on(login, (state): AuthState => ({
        ...state
    })),
    on(loginSuccess, (state, { loginData }): AuthState => ({
        ...state,
        loginData,
        serverLoginError: ""
    })),
    on(loginFailed, (state, { serverLoginError }): AuthState => ({
        ...state,
        loginData: null,
        serverLoginError
    })),
    on(signUp, (state): AuthState => ({
        ...state
    })),
    on(signUpSuccess, (state, { signUpData }): AuthState => ({
        ...state,
        signUpData,
        serverSignUpError: ""
    })),
    on(signUpFailed, (state, { serverSignUpError }): AuthState => ({
        ...state,
        loginData: null,
        serverSignUpError
    })),
    on(formRedirect, (state): AuthState => ({
        ...state,
        loginData: null,
        signUpData: null,
        serverLoginError: "",
        serverSignUpError: "",
    })),
    on(logoutSuccess, (): AuthState => ({
        ...initaialAuthState,
        loginData: null,
        signUpData: null,
    })),
);
