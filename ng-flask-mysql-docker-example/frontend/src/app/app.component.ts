import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend';
	msg1 = 'N/A'; 
	msg2 = 'N/A';
	inputName = 'world';
	endpoint = 'http://localhost:5000/';

	constructor(private http: HttpClient) {}

	verifyServer() {
		this.http
			.get(this.endpoint, { responseType: 'text' })
			.subscribe(res => {
				this.msg1 = res + ' ' + new Date();
				console.log(this.msg1);
			});
	}

	sayHello() {
		this.http
			.post(this.endpoint + 'hello', this.inputName, {
				responseType: 'text'
			})
			.subscribe(res => {
				this.msg2 = res;
				console.log(res);
			});
	}
}
