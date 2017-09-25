import { Routes, RouterModule } from '@angular/router';

import { TravelChannel }      from './travel.channel';

const routes: Routes = [
    {
        path: 'travel',
        children: [
            { path: '',      component: TravelChannel },
            //{ path: 'place', component: TravelChannel },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
