/**
 * Dynamic entity component, this component is only responsible for creating the
 * entity body, the work of creating entity page is handled by upper level component.
 */
import { Component, Input, AfterViewInit, ViewChild,
    DynamicComponentLoader,
    ComponentFactoryResolver, OnDestroy} from '@angular/core';

import { DynEntityDirective } from './dyn-entity.directive';
import { Entity } from '../core/models';

@Component({
    selector: 'entity-component',
    template: `
              <div class="entity-body">
                   <ng-template dyn-entity></ng-template>
              </div>
              `
})
export class DynEntityComponent implements AfterViewInit {
    @Input() entity: Entity;
    @ViewChild(DynEntityDirective) directive: DynEntityDirective;

    constructor(private reslover: ComponentFactoryResolver) {}

    ngAfterViewInit() {
        this.loadComponent();
    }

    loadComponent() {
        let componentFactory = this.reslover.resolveComponentFactory(this.post.component);
        let viewRef  = this.postDirective;
        viewRef.clear();

        let componentRef = viewRef.createComponent(componentFactory);
        (<EntityComponent>componentRef.instance).data = this.post.data;
    }
}