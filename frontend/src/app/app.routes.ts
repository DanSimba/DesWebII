import { Routes } from '@angular/router';
import { HomeView } from './views/home-view/home-view';
import { LoginView } from './views/login-view/login-view';
import { AutocadastroView } from './views/autocadastro-view/autocadastro-view';
import { MaintenanceListView } from './views/maintenance-list-view/maintenance-list-view';

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
        path: 'solicitation/:',
        loadComponent: () => import('./views/solicitation-view/solicitation-view').then(m => m.SolicitationView)
    },
];
