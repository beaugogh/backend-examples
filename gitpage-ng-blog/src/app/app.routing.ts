import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Post20171105Component } from './components/posts/post20171105/post20171105.component';
import { ModuleWithProviders } from '@angular/core';
import { Post20180312Component } from './components/posts/post20180312/post20180312.component';
import { Post20180608Component } from './components/posts/post20180608/post20180608.component';
import { Post20180701Component } from './components/posts/post20180701/post20180701.component';
import { Post20180825Component } from './components/posts/post20180825/post20180825.component';
import { PostComponent } from './components/posts/post/post.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: '20171105',
		component: Post20171105Component
	},
	{
		path: '20180312',
		component: Post20180312Component
	},
	{
		path: '20180608',
		component: Post20180608Component
	},
	{
		path: '20180701',
		component: Post20180701Component
	},
	{
		path: '20180825',
		component: Post20180825Component
	},
	{
		path: '**',
		component: PostComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
