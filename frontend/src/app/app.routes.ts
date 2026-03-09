import { Routes } from '@angular/router';
import { HomeView } from './views/home-view/home-view';
import { LoginView } from './views/login-view/login-view';
import { AutocadastroView } from './views/autocadastro-view/autocadastro-view';

export const routes: Routes = [
    {
        path:'', 
        component: HomeView
    },
    {
        path:'login', 
        component: LoginView
    },
    {
        path:'autocadastro',
        component: AutocadastroView
    },
];
