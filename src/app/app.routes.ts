import { Routes } from '@angular/router';
import { APP_ROUTES } from './Shared/Cosntents/app-route';
import { LayoutComponent } from './Pages/layout/layout.component';

export const routes: Routes = [
  {
    path: APP_ROUTES.EMPTY_ROUTE,
    loadComponent:()=>import('./Pages/login/login.component').then((r)=>r.LoginComponent),
  },
  {
    path: APP_ROUTES.LOGIN,
    loadComponent:()=>import('./Pages/login/login.component').then((r)=>r.LoginComponent),
  },
  {
    path: APP_ROUTES.Register,
    loadComponent:()=>import('./Pages/Register/register-user/register-user.component').then((r)=>r.RegisterUserComponent)
  },
  {
    path: APP_ROUTES.LAYOUT,
    component: LayoutComponent,
    children: [
      {
        path:APP_ROUTES.DASHBOARD,
        loadComponent: () => import('./Pages/dashboard/dashboard.component').then((r) => r.DashboardComponent),
      },
      {
        path:APP_ROUTES.HOME,
        loadComponent: () => import('./Pages/Villa/home-villa/home-villa.component').then((r) => r.HomeVillaComponent),
      },
      {
        path:APP_ROUTES.Villas,
        loadComponent: () => import('./Pages/Villa/index-villa/index-villa.component').then((r) => r.IndexVillaComponent),
      },
      {
        path:APP_ROUTES.CreateVilla,
        loadComponent: () => import('./Pages/Villa/create_edit-villa/create_edit-villa.component').then((r) => r.CreateVillaComponent),
      },
      {
        path:APP_ROUTES.EditVilla,
        loadComponent: () => import('./Pages/Villa/create_edit-villa/create_edit-villa.component').then((r) => r.CreateVillaComponent),
      },
      {
        path:APP_ROUTES.VillaNumber,
        loadComponent: () => import('./Pages/VillaNumber/index-villa-number/index-villa-number.component').then((r) => r.IndexVillaNumberComponent),
      },
      {
        path:APP_ROUTES.CreateVillaNumbers,
        loadComponent: () => import('./Pages/VillaNumber/create-edit-villa-number/create-edit-villa-number.component').then((r) => r.CreateEditVillaNumberComponent),
      },
      {
        path:APP_ROUTES.EditVillaNumbers,
        loadComponent: () => import('./Pages/VillaNumber/create-edit-villa-number/create-edit-villa-number.component').then((r) => r.CreateEditVillaNumberComponent),
      },
    ]
  },

];
