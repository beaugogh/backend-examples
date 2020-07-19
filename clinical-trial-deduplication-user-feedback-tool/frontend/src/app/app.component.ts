import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	msg1 = 'N/A';
	endpoint = 'http://localhost:5000/';

	constructor(private http: HttpClient) {}

	verifyServer() {
		this.http
			.get(this.endpoint + 'hello', { responseType: 'text' })
			.subscribe(res => {
				this.msg1 = res + ' ' + new Date();
				console.log(this.msg1);
			});
	}
}
