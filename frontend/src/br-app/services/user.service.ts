import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { getIsAdmin, getUserName } from "../store/state/user.state";

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

  constructor(
      private httpClient: HttpClient,
      private store$: Store,
  ) { }

  getUserData(): Observable<User | null> {
    const authData: LocalStorageAuthData = JSON.parse(localStorage.getItem("authData"));
    const userId = authData["userId"];
    if (userId) {
      return this.httpClient.get<User>(`/api/users/${userId}`);
    }
    return null;
  }
}
