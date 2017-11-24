/**
 * This is the template that display a complete cms post from title to content.
 */

import { Component, Input }  from '@angular/core';
import { Entity }            from '../core/models';

@Component({
    selector: 'post-area',
    templateUrl: './post.area.html'
})
export class PostArea
{
    @Input() entity: Entity;
}
