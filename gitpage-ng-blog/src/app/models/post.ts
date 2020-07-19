export class Post {
	private _stamp: string;
	private _title: string;
	private _coverImgSrc: string;
	private _dateEng: string;
	private _dateChs: string;
	private _dateString: string;

	constructor(title: string, stamp: string) {
		this.title = title;
		this.stamp = stamp;
		this.coverImgSrc = `assets/${stamp}/cover.jpg`;
		this.generateDates();
	}

	private generateDates() {
		const year = Number(this.stamp.substring(0, 4));
		const month = Number(this.stamp.substring(4, 6));
		const day = Number(this.stamp.substring(6, 8));
		let monthEng = '';
		switch (month) {
			case 1: {
				monthEng = 'Jan';
				break;
			}
			case 2: {
				monthEng = 'Feb';
				break;
			}
			case 3: {
				monthEng = 'Mar';
				break;
			}
			case 4: {
				monthEng = 'Apr';
				break;
			}
			case 5: {
				monthEng = 'May';
				break;
			}
			case 6: {
				monthEng = 'Jun';
				break;
			}
			case 7: {
				monthEng = 'Jul';
				break;
			}
			case 8: {
				monthEng = 'Aug';
				break;
			}
			case 9: {
				monthEng = 'Sep';
				break;
			}
			case 10: {
				monthEng = 'Oct';
				break;
			}
			case 11: {
				monthEng = 'Nov';
				break;
			}
			case 12: {
				monthEng = 'Dec';
				break;
			}
		}
		this.dateEng = monthEng + ' ' + day + ', ' + year;
		this.dateChs = month + '月' + day + '日';
		this.dateString = this.dateEng + ' · ' + this.dateChs;
	}

	get stamp(): string {
		return this._stamp;
	}

	set stamp(value: string) {
		this._stamp = value;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get coverImgSrc(): string {
		return this._coverImgSrc;
	}

	set coverImgSrc(value: string) {
		this._coverImgSrc = value;
	}

	get dateEng(): string {
		return this._dateEng;
	}

	set dateEng(value: string) {
		this._dateEng = value;
	}

	get dateChs(): string {
		return this._dateChs;
	}

	set dateChs(value: string) {
		this._dateChs = value;
	}

	get dateString(): string {
		return this._dateString;
	}

	set dateString(value: string) {
		this._dateString = value;
	}
}
