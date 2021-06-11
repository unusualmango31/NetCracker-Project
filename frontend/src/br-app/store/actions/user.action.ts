import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export const getUserData = createAction(
    "[User] get user data",
);

export const getUserDataSuccess = createAction(
    "[User] get user data success",
    props<{ userData: User }>(),
);

export const getUserDataFail = createAction(
    "[User] failed to get user data",
    props<{ errors: string }>(),
);
export const userLogout = createAction(
    "[User] user logout",
);
