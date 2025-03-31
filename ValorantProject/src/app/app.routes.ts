import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'agents:/:id', loadComponent: () => import('./agents/agents.component').then(a => a.AgentsComponent) },
    { path: 'bundles', loadComponent: () => import('./bundles/bundles.component').then(b => b.BundlesComponent) },
    { path: 'maps', loadComponent: () => import('./maps/maps.component').then(m => m.MapsComponent) },
    { path: 'about', loadComponent: () => import('./about/about.component').then(a => a.AboutComponent) },
];
