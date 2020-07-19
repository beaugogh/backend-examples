import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * To intercept each outgoing HTTP request from the frontend,
 * set the req.headers.authorization with token, with 'Bear ' format
 * this corresponds to the authentication middleware in the backend.
 *
 * This interceptor service should be provided in app.module
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const token = this.authService.token;
		const authRequest = req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + token)
		});
		return next.handle(authRequest);
	}
}
