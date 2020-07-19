import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../../models/auth-data';

/**
 * As the login component is only used via routing,
 * there is no need to create a selector.
 *
 * The form used in this component is the Angular template form,
 * where we let Angular automatically handle data binding and validation,
 * it provides less control compared to reactive form,
 * but is easier to implemnt and sufficient for simple scenarios such as login.
 */
@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService) {}

	ngOnInit() {}

	onLogin(form: NgForm) {
		if (form.invalid) {
			return;
		}
		const authData: AuthData = {
			email: form.value.email,
			password: form.value.password
		};
		this.authService.login(authData);
	}

	get isAuthenticating(): boolean {
		return this.authService.isAuthenticating;
	}
}
