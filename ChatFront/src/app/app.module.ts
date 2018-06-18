import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { myRoutes } from './app-routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    myRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
