import { Routes } from '@angular/router';
import { HomeView } from './page/home-view/home-view';
import { LoginView } from './page/login-view/login-view';
import { AutocadastroView } from './page/autocadastro-view/autocadastro-view';
import { MaintenanceListView } from './page/maintenance-list-view/maintenance-list-view';
import { Client } from './page/client/client';

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
    { 
        path: 'maintenance-list',
        component: MaintenanceListView
    },
    {
        path: 'client',
        component: Client
    }
];
