import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _userId: string;
	private _token: string;
	private _tokenTimer: any;
	// data aynchronously updated upon login
	private _isAuthenticated = false;
	private _isAuthenticating = false;
	// data asynchronously updated up signup
	private _isSigningUp = false;

	constructor(private http: HttpClient, private router: Router) {}

	signup(authData: AuthData) {
		this._isSigningUp = true;
		return this.http.post(BACKEND_URL + '/signup', authData).subscribe(
			response => {
				this._isSigningUp = false;
				console.log('signed up', response);
				this.router.navigate(['/']);
			},
			err => {
				this._isSigningUp = false;
			}
		);
	}

	login(authData: AuthData) {
		this._isAuthenticating = true;
		return this.http
			.post<{ token: string; expiresIn: number; userId: string }>(
				BACKEND_URL + '/login',
				authData
			)
			.subscribe(
				response => {
					const token = response.token;
					const userId = response.userId;
					if (token) {
						// assuming backend returns expiration duration in milliseconds
						const duration = response.expiresIn;
						// set time-out to log out when the token expires
						this.setAuthTimer(duration);
						const now = new Date();
						const expirationDate = new Date(now.getTime() + duration);
						this.setAuthStorage(token, expirationDate, userId);
						this.router.navigate(['/']);
						console.log('logged in', response);
					}
					this.updateAuth(token, userId);
				},
				err => {
					// login fails
					this.updateAuth(null, null);
				}
			);
	}

	autoLogin() {
		const token = localStorage.getItem('token');
		const tokenExpiration = localStorage.getItem('tokenExpiration');
		const userId = localStorage.getItem('userId');
		if (token && tokenExpiration) {
			const now = new Date();
			const expiresIn = new Date(tokenExpiration).getTime() - now.getTime();
			if (expiresIn > 0) {
				this._token = token;
				this.setAuthTimer(expiresIn);
			}
		}
		this.updateAuth(token, userId);
	}

	logout() {
		this.updateAuth(null, null);
		clearTimeout(this._tokenTimer);
		this.clearAuthStorage();
		this.router.navigate(['/']);
	}

	private updateAuth(token: string, userId: string) {
		this._token = token;
		this._isAuthenticated = token ? true : false;
		this._isAuthenticating = false;
		this._userId = userId;
	}

	private setAuthTimer(duration: number) {
		this._tokenTimer = setTimeout(() => {
			this.logout();
		}, duration);
	}

	private setAuthStorage(token: string, expirationDate: Date, userId: string) {
		localStorage.setItem('token', token);
		localStorage.setItem('tokenExpiration', expirationDate.toISOString());
		localStorage.setItem('userId', userId);
	}

	private clearAuthStorage() {
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('userId');
	}

	get userId(): string {
		return this._userId;
	}
	get token(): string {
		return this._token;
	}
	get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}
	get isAuthenticating(): boolean {
		return this._isAuthenticating;
	}
	get isSigningUp(): boolean {
		return this._isSigningUp;
	}
}
