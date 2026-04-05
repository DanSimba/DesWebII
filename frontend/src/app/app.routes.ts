import { Routes } from '@angular/router';
import { HomeView } from './page/home-view/home-view';
import { Client } from './page/client/client';
import { SolicitationFormClient } from './presentation/client/solicitation-form-client/solicitation-form-client';

import { Auth } from './page/auth/auth';
import { LoginComponent } from './shared/auth-components/login-item/login-component';
import { SignUpComponent } from './shared/auth-components/signUp-item/signUp-Component';
import { Func } from './page/func/func';
import { CategoriaCrud } from './presentation/func/categoria-crud/categoria-crud';
import { FuncionarioCrud } from './presentation/func/funcionario-crud/funcionario-crud';

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
      /*{
        path: 'list',
        loadComponent: () =>
          import('./page/maintenance-list-view/maintenance-list-view').then(
            (m) => m.MaintenanceListView,
          ),
      }*/
      {
        path: 'crud-cat',
        children: [
          {
            path: '',
            loadComponent: () => import('./presentation/func/categoria-crud/categoria-crud').then((m) => m.CategoriaCrud),
          },
          { path: 'new', loadComponent: () => import('./presentation/func/edit-categoria/edit-categoria.component').then((m) => m.EditCategoriaComponent) },
          { path: 'edit/:id', loadComponent: () => import('./presentation/func/edit-categoria/edit-categoria.component').then((m) => m.EditCategoriaComponent) },
        ]
      },
      {
        path: 'crud-func',
        children: [
          { path: '', loadComponent: () => import('./presentation/func/funcionario-crud/funcionario-crud').then((m) => m.FuncionarioCrud) },
          { path: 'new', loadComponent: () => import('./presentation/func/edit-funcionario/edit-funcionario.component').then((m) => m.EditFuncionarioComponent) },
          { path: 'edit/:id', loadComponent: () => import('./presentation/func/edit-funcionario/edit-funcionario.component').then((m) => m.EditFuncionarioComponent) },
        ]
      },
      {
        path: 'relatorio',
        loadComponent: () =>
          import('./page/relatorio/relatorio.component').then((m) => m.RelatorioComponent),
      },
      {
        path: 'budget',
        loadComponent: () => import('./presentation/func/maintenance-budget/maintenance-budget.component').then(m => m.MaintenanceBudgetComponent)
      },
      {
        path: 'task',
        loadComponent: () => import('./presentation/func/maintenance-task/maintenance-task.component').then(m => m.MaintenanceTaskComponent)
      },
    ],
  },
];
