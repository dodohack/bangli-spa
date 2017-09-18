import { NgModule } from '@angular/core';

import { HomeRoutes } from './routes';
import { HomePage }   from './home.page';

@NgModule({
    imports: [HomeRoutes],
    declarations: [HomePage]
})
export class HomeModule {}
