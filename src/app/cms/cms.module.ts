import { NgModule }      from '@angular/core';
import { DynamicModule } from '../core/dynamic/dynamic.module';
import { SharedModule }  from '../common/shared.module';

import { routing }       from './routes';
import { PostArea }      from './post.area';
import { PostPage }      from './post.page';

@NgModule({
    imports: [ SharedModule, DynamicModule, routing ],
    declarations: [
        PostArea,
        PostPage,
    ],
})
export class CmsModule {}
