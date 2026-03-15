import { Routes } from '@angular/router';
import { HomeView } from './page/home-view/home-view';
import { MaintenanceListView } from './page/maintenance-list-view/maintenance-list-view';
import { Client } from './page/client/client';
import { SolicitationFormClient } from './presentation/client/solicitation-form-client/solicitation-form-client';
import { CrudCat } from './page/crud-cat/crud-cat';
import { LoginView } from './page/auth/login-view/login-view';
import { AutocadastroView } from './page/auth/autocadastro-view/autocadastro-view';

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
        component: Client,
        children: [
            {path: 'solicitation',
                 component:SolicitationFormClient //lazy-loading??? que tal????
            },
            {path: 'panel', 
                loadComponent: () => import('./presentation/client/solicitation-panel/solicitation-panel').then(m => m.SolicitationPanel)
            },
            {path: 'view-solicitation/:', 
                loadComponent: () => import('./presentation/client/view-sol/view-sol').then(m => m.ViewSol)
            },
        ]
    },
    {
        path:'funcionario/crud-cat',
        component:CrudCat
    }
];
