import { Routes, RouterModule } from '@angular/router';

import { PostPage }        from './post.page';

const routes: Routes = [
    { path: 'post/:id',       component: PostPage },
];

export const routing = RouterModule.forChild(routes);
