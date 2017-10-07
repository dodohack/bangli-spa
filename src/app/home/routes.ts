import { Routes, RouterModule } from '@angular/router';

import { HomePage }             from './home.page';

const routes: Routes = [
    // Phase 1 hack, redirect '/' to '/deal'.
    //
    // FIXME: If we comment out this line and enable the redirect line
    // afterward, it will cause error "Cannot read property 'routeConfig' or undefined".
    // Probably it is caused by some component not initializing Router??
    //
    {path: '', component: HomePage}
    //{path: '', redirectTo: '/deal', pathMatch: 'full'}
];

export const HomeRoutes = RouterModule.forChild(routes);
