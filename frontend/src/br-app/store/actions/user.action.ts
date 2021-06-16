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
export const updateUser = createAction(
    "[User] user update",
    props<{ userData: User }>(),
);
export const updateUserSuccess = createAction(
    "[User] user has been updated",
    props<{ userData: User }>(),
);
export const userLogout = createAction(
    "[User] user logout",
);
