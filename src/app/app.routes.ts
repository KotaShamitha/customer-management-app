import { Routes } from '@angular/router';

import { authRoutes } from './auth/auth.routes';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: authRoutes,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full',
      },
      {
        path: 'customers',
        component: CustomerListComponent,
      },
      {
        path: 'add',
        component: AddCustomerComponent,
      },
      {
        path: 'view/:id',
        component: ViewCustomerComponent,
      },
    ],
  },
];
