import { User } from "../../models/user";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export const USER_FEATURE_NAME = "user";

export interface UserState {
    userData?: User;
    userId?: number;
    errors: string;
}

export const initialUserState: UserState = {
    errors: "",
};

const getFeature = createFeatureSelector<UserState>(USER_FEATURE_NAME);

export const getUser = createSelector(getFeature, (state) => state.userData);
export const getUserId = createSelector(getFeature, (state) => state.userId);
export const getIsAdmin = createSelector(getUser, ( user) => {
    return user ? user.isAdmin : null;
});
export const getUserName = createSelector(getUser, ( user) => {
    return user ? user.username : null;
});


