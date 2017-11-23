/**
 * We are going to initiate dynamic module/component here with the help
 * of DynamicComponentBuilder.
 */

import { Component, Input }         from '@angular/core';
import { AfterContentInit }         from '@angular/core';
import { OnInit, OnDestroy }        from '@angular/core';
import { OnChanges, SimpleChange }  from '@angular/core';
import { ViewChild }                from '@angular/core';
import { ViewContainerRef }         from '@angular/core';
import { ComponentRef }             from '@angular/core';
import { ComponentFactory }         from '@angular/core';

import { DynamicBuilder }           from './dynamic.builder';
import { DynamicData }              from './dynamic.builder';

@Component({
    selector: 'dynamic-content',
    template: `<div #target></div>`
})
export class DynamicContent implements AfterContentInit, OnChanges, OnDestroy
{
    @ViewChild('target', { read: ViewContainerRef }) target: any;

    // contentId is used a cache key
    @Input() contentId: string;
    // Runtime content that will be the template of runtime component
    @Input() content: string;
    // Should this component generate a menu for <h2> - <h6> from content?
    @Input() hasMenu = true;

    component: ComponentRef<DynamicData>;

    // Until ngAfterContentInit, we cannot start (firstly) to process dynamic stuff
    isViewInitialized = false;

    constructor(private builder: DynamicBuilder) {}

    updateComponent() {
        if (!this.isViewInitialized)
            return;

        // Do not create the component when content is not ready
        if (!this.content)
            return;

        if (this.component) {
            // When the `content` input changes we destroy a previously
            // created component before create the new one
            this.component.destroy();
        }

        // Here we get factory (just compiled or from cache)
        this.builder.createComponentFactory(this.contentId, this.content, this.hasMenu)
            .then((factory: ComponentFactory<DynamicData>) => {
                // Target will instantiate and inject component, we keep a
                // reference the the created component
                this.component = this.target.createComponent(factory);
            });
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}): void {
        this.updateComponent();
    }

    ngAfterContentInit(): void {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if (this.component) this.component.destroy();
    }
}
