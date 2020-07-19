import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

/**
 * Lazy loading:
 * to lazily load the two auth components,
 * we provide auth.module's own routing here,
 * and use RouterModule.forChild(routes).
 *
 * This child routing module needs to be
 * imported and exported in auth.module.
 *
 * Then, the AuthModule, as it is lazy now,
 * can be removed from the imports of AppModule,
 * and the corresponding path for the AuthModule
 * need to be added to app-routing.module.ts
 */
const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
