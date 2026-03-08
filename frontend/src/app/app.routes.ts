import { Routes } from '@angular/router';
import { HomeView } from './views/home-view/home-view';
import { LoginView } from './views/login-view/login-view';

export const routes: Routes = [
    {
        path:'', 
        component: HomeView
    },
    {
        path:'login', 
        component: LoginView
    },
];
