import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { getIsAdmin, getUserName } from "../store/state/user.state";

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
    const authData = JSON.parse(localStorage.getItem("authData"));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = authData["userId"];
    if (userId) {
      return this.httpClient.get<User>(`/api/users/${userId}`);
    }
    return null;
  }
}
