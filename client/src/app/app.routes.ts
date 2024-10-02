import { Routes } from "@angular/router";
import { UnauthenticatedGuard } from "./guards/unauthenticated.guard";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(module => module.AuthModule),
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'communities',
    loadChildren: () => import('./pages/communities/communities.module').then(module => module.CommunitiesModule)
  },
  {
    path: '**',
    redirectTo: 'communities'
  },
]
