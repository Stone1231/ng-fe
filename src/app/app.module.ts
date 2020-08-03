import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ErrorComponent as ErrorPlusComponent } from './components/error-plus/error.component';
import { FileComponent} from './components/file/file.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAfterComponent } from './components/login/loginAfter.component';
import { CounterComponent } from './components/counter/counter.component';
import { UsersComponent } from './components/user/users.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent as UsersPlusComponent } from './components/user-plus/users.component';
import { UserComponent as UserPlusComponent } from './components/user-plus/user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ErrorComponent,
    ErrorPlusComponent,
    FileComponent,
    LoginComponent,
    LoginAfterComponent,
    CounterComponent,
    UsersComponent,
    UserComponent,
    UsersPlusComponent,
    UserPlusComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MenuModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    JwtModule.forRoot({config: {}}),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
