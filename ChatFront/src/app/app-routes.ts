import { RouterModule, Routes } from "@angular/router";

import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { DataDrivenComponent } from './data-driven/data-driven.component';

const MY_ROUTES: Routes = [
    { path: 'chat', component: ChatComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '/' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);






























// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
