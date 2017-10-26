/**
 * Top optional-fixed nav bar for mobile website
 */

import {
    Component,
    Inject,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Entity } from '../../core/models';
import { Helper } from "../../core/helper";

@Component({
    selector: 'voucher-code-dialog',
    template: `
    <p *ngIf="data.vouchers">优惠码: {{ data.vouchers }}</p>
    <p *ngIf="data.title">{{ data.title }}</p>
    <a mat-raised-button color="primary" *ngIf="data.vouchers" 
       href="{{data.tracking_url}}" target="_blank" 
       rel="nofollow" ngxClipboard [cbContent]="data.vouchers">复制优惠码</a>
    <a mat-raised-button href="{{data.tracking_url}}" target="_blank" rel="nofollow">购买链接</a>
    `
})
export class VoucherCodeDialog {
    constructor(public dialog: MatDialogRef<VoucherCodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
    selector: 'topic-body',
    templateUrl: './topic.body.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeIn', [
            state('in', style({ opacity: '1'})),
            transition(':enter', [
                style({ opacity: '0'}),
                animate(500),
            ]),
        ]),
    ],
})
export class TopicBody
{
    // The type of topic, some topic has slightly different head
    @Input() ttype: string;

    @Input() tabIdx: string;  // String index of default showing tab
    @Input() topic: Entity;

    constructor(private helper: Helper, public dialog: MatDialog) {}

    // Topic content
    get content() { return this.topic && this.topic.content; }

    // Posts of this topic
    //get posts() { return this.topic.posts; }

    // Offers of this topic
    get offers() { return this.topic && this.topic.offers; }


    get hasOffer() { return this.topic && this.offers && this.offers.length > 0; }

    get numOffers() {
        let num = this.topic && this.offers && this.offers.length;
        if (num) return ' (' + num + ')';
        return;
    }

    // Display different tab for different page anchor
    get selectedTab() {
        switch (this.tabIdx) {
            case 'deal':
                return 1;
            default:
                return 0;
        }
    }

    openVoucherDialog(title: string = null, vouchers: string = null,
                      tracking_url: string = null) {
        this.dialog.open(VoucherCodeDialog,
            {data: {title: title, vouchers: vouchers, tracking_url: tracking_url}});
    }
}
