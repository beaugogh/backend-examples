import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error.component';

/**
 * use this interceptor to intercept all error responses from http calls
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private dialog: MatDialog) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			catchError((err: HttpErrorResponse) => {
				/**
				 * the dialog service directly calls the ErrorComponent,
				 * (which has been instantiated as an entry component in app.module),
				 * to embed it in an overlay dialog shown on the screen.
				 * Meanwhile, we can inject customized data into
				 * the constructor of the error component.
				 */
				let message = 'An unknown error occurred!';
				if (err.error.message) {
					message = err.error.message;
				}
				this.dialog.open(ErrorComponent, { data: { message: message } });
				return throwError(err);
			})
		);
	}
}
