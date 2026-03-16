import { Routes } from '@angular/router';
import { HomeView } from './page/home-view/home-view';
import { MaintenanceListView } from './page/maintenance-list-view/maintenance-list-view';
import { Client } from './page/client/client';
import { SolicitationFormClient } from './presentation/client/solicitation-form-client/solicitation-form-client';
import { Auth } from './page/auth/auth';
import { LoginComponent } from './shared/auth-components/login-item/login-component';
import { SignUpComponent } from './shared/auth-components/signUp-item/signUp-Component';
import { CrudCat } from './page/crud-cat/crud-cat';

export const routes: Routes = [
    {
        path:'', 
        component: HomeView
    },
    {
        path:'auth', 
        component: Auth,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'signUp', component: SignUpComponent}
        ]
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
