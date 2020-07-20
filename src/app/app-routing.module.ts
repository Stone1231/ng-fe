import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CounterComponent } from './components/counter/counter.component';
import { UsersComponent } from './components/user/users.component';
import { UsersComponent as UsersPlusComponent } from './components/user-plus/users.component';
// import { UsersComponent } from './components/user/users.component';
// import { FileComponent } from './components/file/file.component';
// import { LoginComponent } from './components/login/login.component';
// import { LoginAfterComponent } from './components/login/loginAfter.component';
// import { ErrorComponent } from './components/error/error.component';
const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'user', component: UsersComponent },
    { path: 'user-plus', component: UsersPlusComponent },
    // { path: 'users', component: UsersComponent },
    // { path: 'file', component: FileComponent },
    // { path: 'login', component: LoginComponent },
    // { path: 'login-after', component: LoginAfterComponent },
    // { path: 'error', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
