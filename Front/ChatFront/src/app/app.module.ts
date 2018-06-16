import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { myRoutes } from './app-routes';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    myRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
