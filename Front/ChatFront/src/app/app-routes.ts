import { RouterModule, Routes } from "@angular/router";

// import { ThankyouComponent } from "./thankyou/thankyou.component";
// import { DataDrivenComponent } from './data-driven/data-driven.component';

const MY_ROUTES: Routes = [
    //{ path: 'Access', component: DataDrivenComponent },
    //{ path: 'Home', component: ThankyouComponent },
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
