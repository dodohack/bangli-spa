/**
 * Side nav, wrapper of mat-sidenav
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

@Component({
    selector: 'side-nav',
    templateUrl: './side.nav.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNav
{
    // The type of navbar to show on different pages.
    @Input() navType: string;

    constructor(private cd: ChangeDetectorRef) {}
}
