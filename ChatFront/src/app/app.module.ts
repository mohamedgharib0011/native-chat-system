import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// use ReactiveFormsModule Only when using Data Driven Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// componenets
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatComponent } from './components/chat/chat.component';

// routes
import { myRoutes } from './app-routes';

// interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';

// services section
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { TranslationPipe } from './pipes/translation.pipe';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/unauth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TranslationPipe,
    SignupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    myRoutes,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService, SignupService,AuthGuard,UnAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
