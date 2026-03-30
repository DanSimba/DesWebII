import { Routes } from '@angular/router';
import { HomeView } from './page/home-view/home-view';
import { Client } from './page/client/client';
import { SolicitationFormClient } from './presentation/client/solicitation-form-client/solicitation-form-client';
import { CrudCat } from './page/crud-cat/crud-cat';
import { CrudFunc } from './page/crud-func/crud-func';
import { Auth } from './page/auth/auth';
import { LoginComponent } from './shared/auth-components/login-item/login-component';
import { SignUpComponent } from './shared/auth-components/signUp-item/signUp-Component';
import { Func } from './page/func/func';

export const routes: Routes = [
  {
    path: '',
    component: HomeView,
  },
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: 'client',
    component: Client,
    children: [
      {
        path: 'solicitation',
        component: SolicitationFormClient, //lazy-loading??? que tal????
      },
      {
        path: 'panel',
        loadComponent: () =>
          import('./presentation/client/solicitation-panel/solicitation-panel').then(
            (m) => m.SolicitationPanel,
          ),
      },
      {
        path: 'view-solicitation/:',
        loadComponent: () =>
          import('./presentation/client/view-sol/view-sol').then((m) => m.ViewSol),
      },
    ],
  },
  {
    path: 'func',
    component: Func,
    children: [
      {
        path: 'panel',
        loadComponent: () =>
          import('./presentation/func/maintenance-panel/maintenance-panel').then(
            (m) => m.MaintenancePanel,
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./page/maintenance-list-view/maintenance-list-view').then(
            (m) => m.MaintenanceListView,
          ),
      },
      {
        path: 'crud-cat',
        loadComponent: () => import('./page/crud-cat/crud-cat').then((m) => m.CrudCat),
      },
      {
        path: 'crud-func',
        loadComponent: () => import('./page/crud-func/crud-func').then((m) => m.CrudFunc),
      },
      {
        path: 'relatorio',
        loadComponent: () =>
          import('./page/relatorio/relatorio.component').then((m) => m.RelatorioComponent),
      },
    ],
  },
];
