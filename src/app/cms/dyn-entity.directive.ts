/**
 * A generic dynamic component directive.
 */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dyn-entity]',
})
export class DynEntityDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
