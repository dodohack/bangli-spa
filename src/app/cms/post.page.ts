/**
 * Post page component
 * TODO: Abstract the post body into a separate component, so it can be reused
 */
import { Component, Input, AfterViewInit, ViewChild,
    ComponentFactoryResolver, OnDestroy} from '@angular/core';

import { PostDirective } from './post.directive';

@Component({
    templateUrl: './post.page.html'
})
export class PostPage implements AfterViewInit, OnDestroy {

}