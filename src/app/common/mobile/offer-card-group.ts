
/**
 * The card widget used to display single offer or post
 */

import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Entity }                  from "../../core/models";

@Component ({
    selector: 'offer-card-group',
    templateUrl: './offer-card-group.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardGroup
{
    @Input() offers: Entity[];
    @Input() title: string;
    @Input() category: string;

}
