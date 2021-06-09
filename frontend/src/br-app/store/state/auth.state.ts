import { createFeatureSelector, createSelector } from "@ngrx/store";

export const AUTH_FEATURE_NAME = "auth";

export interface LoginData {
    token: string;
    userId?: string;
    iat?: number;
    exp?: number;
}

export interface SignUpData {
    email: string;
    username: string;
    password: string;
}

export interface AuthState {
    serverLoginError: string;
    serverSignUpError: string;
    loginData?: LoginData;
    signUpData?: SignUpData;
}

export const initaialAuthState: AuthState = {
    serverLoginError: "",
    serverSignUpError: "",
};

const getFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_NAME);

export const getServerLoginError = createSelector(getFeature, (state) => state.serverLoginError);
export const getServerSignUpError = createSelector(getFeature, (state) => state.serverSignUpError);
export const getLoginData = createSelector(getFeature, (state) => state.loginData);
export const getSignUpData = createSelector(getFeature, (state) => state.signUpData);
export const getToken = createSelector(getLoginData, (loginData) => (loginData ? loginData.token : null));
export const getIsAuth = createSelector(getToken, (token) => !!token);


