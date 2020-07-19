import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	endpoint = 'http://localhost:5000/';

	constructor(private http: HttpClient) {}

	makeGetCall(url: string): Observable<any> {
		return this.http.get(this.endpoint + url, { responseType: 'json' });
	}

	makePostCall(url: string, body: object): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
		return this.http.post(this.endpoint + url, body, httpOptions);
	}
}
