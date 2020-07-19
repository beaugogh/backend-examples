import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

/**
 * Note that since this error component is only invoked by the error-interceptor
 * when there occurs an error, by a MaterialUI Dialog service, see error-interceptor.ts,
 * we need to initialize it first in the app.module as entry components, see app.module.ts.
 *
 * When invoked by the error-interceptor by Material Dialog,
 * more detailed error data is injected into this component,
 * which we can catch at the constrcutor with '@INJECT(MAT_DIALOG_DATA)'
 */
@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

	ngOnInit() {}
}
