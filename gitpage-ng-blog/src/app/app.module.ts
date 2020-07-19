import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { PostService } from './services/post.service';
import {
	BrowserAnimationsModule,
	NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { MatGridListModule, MatButtonModule } from '@angular/material';
import { DataGridModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PostComponent } from './components/posts/post/post.component';
import { Post20180312Component } from './components/posts/post20180312/post20180312.component';
import { Post20171105Component } from './components/posts/post20171105/post20171105.component';
import { Post20180608Component } from './components/posts/post20180608/post20180608.component';
import { Post20180701Component } from './components/posts/post20180701/post20180701.component';
import { Post20180825Component } from './components/posts/post20180825/post20180825.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		FooterComponent,
		PostComponent,
		Post20171105Component,
		Post20180312Component,
		Post20180608Component,
		Post20180701Component,
		Post20180825Component
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		NoopAnimationsModule,
		CommonModule,
		MatGridListModule,
		MatButtonModule,
		DataGridModule,
		InfiniteScrollModule,
		routing
	],
	providers: [PostService],
	bootstrap: [AppComponent]
})
export class AppModule {}
