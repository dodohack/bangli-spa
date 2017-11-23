/**
 * This is the builder that build a dynamic module/component from post content
 */
import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';
import { Compiler }                     from '@angular/core';
import { Component, Input, Injectable } from '@angular/core';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';

export interface DynamicData {
    entity: any;
}

@Injectable()
export class DynamicBuilder
{
    constructor(private compiler: Compiler,
                private resolver: ComponentFactoryResolver) {}

    // This object is a singleton - so we can use this as a cache
    private factoryCache: {[key: string]: ComponentFactory<DynamicData>} = {};

    /**
     *
     * @param templateId - post id or topic guid
     * @param template - post/topic content
     * @param hasMenu
     * @returns {Promise<T>}
     */
    public createComponentFactory(templateId: string, template: string, hasMenu: boolean)
    : Promise<ComponentFactory<DynamicData>> {

        let factory = this.factoryCache[templateId];

        if (factory) {
            return new Promise(resolve => resolve(factory));
        }

        // Unknown template ... let's create a Type for it
        let type   = this.createComponent(template, hasMenu);
        let module = this.createModule(type);

        // Return a newly created component
        return new Promise(resolve => {
            this.compiler.compileModuleAndAllComponentsAsync(module)
                .then(_factories => {
                    factory = _factories.componentFactories
                        .find(x => x.componentType === type);
                    this.factoryCache[templateId] = factory;
                    resolve(factory);
                });
        });
    }

    /**
     * Create a component type with given 'tmpl' as component template
     * @param tmpl - template string for the component type
     * @param hasMenu - Show we generate content menu or not
     */
    private createComponent(tmpl: string, hasMenu: boolean) {
        @Component({
            selector: 'runtime-component',
            template: tmpl
        })
        class RuntimeComponent implements DynamicData {
            @Input() public entity: any;

            hidden = true; // menu display
        }

        // A component for this particular template
        return RuntimeComponent;
    }

    /**
     * Create a module for given component type
     * @param componentType - component type
     */
    private createModule(componentType: any) {
        @NgModule({
            imports: [RouterModule],
            declarations: [
                componentType
            ],
        })
        class RuntimeComponentModule {}

        // A module for just this type
        return RuntimeComponentModule;
    }
}