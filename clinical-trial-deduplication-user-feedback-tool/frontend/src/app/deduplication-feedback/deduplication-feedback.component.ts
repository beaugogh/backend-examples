import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
	selector: 'app-deduplication-feedback',
	templateUrl: './deduplication-feedback.component.html',
	styleUrls: ['./deduplication-feedback.component.css']
})
export class DeduplicationFeedbackComponent implements OnInit {
	pairs = [];
	current = 0;
	validated = false;
	validUsers = [
		'bo',
		'Gerhard Mulder',
		'gerhard mulder',
		'Gerhard',
		'gerhard',
		'Perry Schoor',
		'perry schoor',
		'Perry',
		'perry'
	];
	username = '';
	showDeduplication = false;

	constructor(private httpService: HttpService) {}

	ngOnInit() {
		this.getPairs();
		console.log('pairs: ', this.pairs);
	}

	getPairs() {
		const minCos = 0,
			maxCos = 0.4,
			duplicated = 1,
			user = this.parseUser();
		const params = `similarities?min_cosine=${minCos}&max_cosine=${maxCos}&duplicated=${duplicated}&user=${user}`;
		this.httpService.makeGetCall(params).subscribe(pairEntries => {
			for (const entry of pairEntries) {
				this.addTrialPair(entry.id_1, entry.id_2);
			}
		});
	}

	addTrialPair(trialId1: string, trialId2: string) {
		const params1 = `trials?id=${trialId1}`;
		this.httpService.makeGetCall(params1).subscribe(trial1 => {
			const params2 = `trials?id=${trialId2}`;
			this.httpService.makeGetCall(params2).subscribe(trial2 => {
				this.pairs.push([trial1, trial2]);
			});
		});
	}

	validateUser() {
		console.log('validate user', this.username);
		this.validated = this.validUsers.includes(this.username);
	}

	get currentPair(): any {
		return this.pairs[this.current];
	}

	get currentLeft(): any {
		return this.currentPair[0];
	}

	get currentRight(): any {
		return this.currentPair[1];
	}

	parseUser(): string {
		let user = this.username.toLowerCase();
		if (user.includes('gerhard')) {
			user = 'gerhard';
		} else if (user.includes('perry')) {
			user = 'perry';
		} else if (user.includes('bo')) {
			user = 'bo';
		} else {
			user += '?';
		}
		return user;
	}

	postFeedback(areDuplicates: boolean) {
		const user = this.parseUser();
		const body = {
			id_1: this.currentLeft['0. Trial ID'],
			id_2: this.currentRight['0. Trial ID'],
			duplicated: areDuplicates,
			creator: user
		};
		this.httpService.makePostCall('feedback', body).subscribe(res => {
			console.log('message:', res);
		});
	}

	yes() {
		this.postFeedback(true);
		this.next();
	}

	no() {
		this.postFeedback(false);
		this.next();
	}

	next() {
		if (this.current < this.pairs.length - 1) {
			this.current++;
		} else {
			console.log('reach the end of the list');
		}
	}
}
