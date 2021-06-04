import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log("test");
    return next.handle(request);
  }
}
