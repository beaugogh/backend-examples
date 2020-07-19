import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * This service is used to guard certain routes
 * that are supposed to be only accessible if the user is logged in,
 * e.g. localhost:4200/create
 *
 * This route-guarding service should
 * be provided and used in app.routing.module.
 */
@Injectable()
export class AuthRouteGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		const isAuthenticated = this.authService.isAuthenticated;
		if (!isAuthenticated) {
			this.router.navigate(['/auth/login']);
		}
		return isAuthenticated;
	}
}
