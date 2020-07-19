import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	lastScrollTop = 0;

	constructor(private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				(<any>window).ga('set', 'page', event.urlAfterRedirects);
				(<any>window).ga('send', 'pageview');
			}
		});
	}

	ngOnInit() {
		window.addEventListener('wheel', this.onWheel, true);
		window.addEventListener('scroll', this.onScroll, true);
		this.lastScrollTop = 0;
	}

	ngOnDestroy() {
		window.removeEventListener('wheel', this.onWheel, true);
		window.removeEventListener('scroll', this.onScroll, true);
	}

	onWheel(e: WheelEvent) {
		const navbar = document.querySelector('.b-navbar-container');
		if (navbar) {
			if (e.deltaY > 0) {
				// scroll down
				navbar['style'].top = '-356px';
			} else {
				// scroll up
				navbar['style'].top = '-300px';
			}
		}
	}

	onScroll(e: Event) {
		let _scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let navbar = document.querySelector('.b-navbar-container');
		if (_scrollTop > this.lastScrollTop) {
			// scroll down
			navbar['style'].top = '-356px';
		} else {
			// scroll up
			navbar['style'].top = '-300px';
		}
		this.lastScrollTop = _scrollTop >= 0 ? _scrollTop : 0;
	}
}
