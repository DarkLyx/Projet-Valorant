import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'agents', loadComponent: () => import('./agents/agents.component').then(a => a.AgentsComponent) },
    { path: 'agent/:id', loadComponent: () => import('./agent-info/agent-info.component').then(a => a.AgentInfoComponent) },
    { path: 'maps', loadComponent: () => import('./maps/maps.component').then(m => m.MapsComponent) },
    { path: 'map-info/:id', loadComponent: () => import('./map-info/map-info.component').then(m => m.MapInfoComponent) },
    { path: 'about', loadComponent: () => import('./about/about.component').then(a => a.AboutComponent) },
    { path: 'create-banners', loadComponent: () => import('./create-banners/create-banners.component').then(a => a.CreateBannersComponent) },
    { path: 'my-banners', loadComponent: () => import('./my-banners/my-banners.component').then(m => m.MyBannersComponent) },
    { path: 'games', loadComponent: () => import('./games/games.component').then(a => a.GamesComponent) },
    { path: 'game-agent', loadComponent: () => import('./game-agent/game-agent.component').then(a => a.GameAgentComponent) },
    { path: 'game-ability-parent', loadComponent: () => import('./game-ability-parent/game-ability-parent.component').then(a => a.GameAbilityParentComponent) },

];
