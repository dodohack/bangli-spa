import { Routes, RouterModule } from '@angular/router';
import { Page404 }              from './404.page';

const routes: Routes = [
    // 404 not found page
    { path: '404', component: Page404 },
];

export const AppRoutes = RouterModule.forRoot(routes);