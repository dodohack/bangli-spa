/**
 * This is the single post component for all posts
 */

import { Component }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Title }             from '@angular/platform-browser';

import { EntityBase }        from '../core';
import { ENTITY }            from '../core/models';
import { AppState }          from '../core/reducers';

@Component({ templateUrl: './post.page.html' })
export class PostPage extends EntityBase
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected title: Title) {
        super(ENTITY.POST, route, store, title);
    }
}
