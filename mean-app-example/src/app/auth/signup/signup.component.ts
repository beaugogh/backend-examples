import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../../models/auth-data';

@Component({
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit() {}

	onSignup(form: NgForm) {
		if (form.invalid) {
			return;
		}
		const authData: AuthData = {
			email: form.value.email,
			password: form.value.password
		};
		this.authService.signup(authData);
	}

	get isSigningUp(): boolean {
		return this.authService.isSigningUp;
	}
}
