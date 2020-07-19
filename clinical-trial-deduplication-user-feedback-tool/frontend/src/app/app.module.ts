import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DeduplicationFeedbackComponent } from './deduplication-feedback/deduplication-feedback.component';
import { HttpService } from './services/http.service';
import { AngularSplitModule } from 'angular-split';

@NgModule({
	declarations: [AppComponent, DeduplicationFeedbackComponent],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AngularSplitModule.forRoot(),
		MatButtonModule,
		MatListModule,
		MatInputModule,
		MatCardModule,
		MatGridListModule
	],
	providers: [
		HttpService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
