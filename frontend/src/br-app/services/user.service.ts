import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { getIsAdmin, getUser, getUserName, getUserTags } from "../store/state/user.state";

interface LocalStorageAuthData {
  email: string;
  exp: number;
  iat: number;
  token: string;
  userId: string;
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  isAdmin$ = this.store$.pipe(
      select(getIsAdmin),
  );
  username$ = this.store$.pipe(
      select(getUserName),
  );
  tags$ = this.store$.pipe(
      select(getUserTags),
  );
  user$ = this.store$.pipe(
      select(getUser),
  );
  currentUser: User;

  constructor(
      private httpClient: HttpClient,
      private store$: Store,
  ) {
  }

  getUserData(): Observable<User | null> {
    const authData: LocalStorageAuthData = JSON.parse(localStorage.getItem("authData"));
    const userId = authData["userId"];
    if (userId) {
      return this.httpClient.get<User>(`/api/users/${userId}`);
    }
    return null;
  }
  updateUser(user: User): Observable<User>  {
    return this.httpClient.patch<User>(`/api/users/${user._id}`, user);
  }
}
