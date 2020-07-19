import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthRouteGuard } from './auth/auth-route-guard';

const routes: Routes = [
	{ path: '', component: PostListComponent },
	{
		path: 'create',
		component: PostCreateComponent,
		canActivate: [AuthRouteGuard]
	},
	{
		path: 'edit/:postId',
		component: PostCreateComponent,
		canActivate: [AuthRouteGuard]
	},
	{
		path: 'auth',
		loadChildren: './auth/auth.module#AuthModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthRouteGuard]
})
export class AppRoutingModule {}
