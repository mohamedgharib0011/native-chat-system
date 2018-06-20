import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./components/chat/chat.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { UnAuthGuard } from "./guards/unauth.guard";


// import { DataDrivenComponent } from './data-driven/data-driven.component';

const MY_ROUTES: Routes = [
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [UnAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
    { path: '', component: LoginComponent, canActivate: [UnAuthGuard] },
    { path: '**', redirectTo: '/', canActivate: [UnAuthGuard] }
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
