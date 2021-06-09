import { createAction, props } from "@ngrx/store";
import { LoginData, SignUpData } from "../state/auth.state";

export const login = createAction(
    "[Auth] login",
    props<{ email: string, password: string }>(),
);
export const loginSuccess = createAction(
    "[Auth] login success",
    props<{ loginData: LoginData }>(),
);
export const loginFailed = createAction(
    "[Auth] login failed",
    props<{ serverLoginError: string }>(),
);
export const initAuth = createAction(
    "[Auth] init auth",
);
export const signUp = createAction(
    "[Auth] sign up",
    props<{ email: string, username: string, password: string }>(),
);
export const signUpSuccess = createAction(
    "[Auth] sign up success",
    props<{ signUpData: SignUpData }>(),
);
export const signUpFailed = createAction(
    "[Auth] sign up failed",
    props<{ serverSignUpError }>(),
);
export const formRedirect = createAction(
    "[Auth] form redirect",
);
export const logout = createAction(
    "[Auth] logout",
);
export const logoutSuccess = createAction(
    "[Auth] logout success",
);
