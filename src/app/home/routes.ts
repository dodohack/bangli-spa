import { Routes, RouterModule } from '@angular/router';

import { HomePage }             from './home.page';

const routes: Routes = [
    {path: '', component: HomePage}
];

export const HomeRoutes = RouterModule.forChild(routes);
