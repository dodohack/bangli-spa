/**
 * Top optional-fixed nav bar for mobile website
 */

import {
    Component,
    Inject,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Offer, Post, Entity } from '../../core/models';

import { IMG_SERVER } from '../../../../.config';

@Component({
    selector: 'voucher-code-dialog',
    template: `
    <p *ngIf="data.vouchers">优惠码: {{ data.vouchers }}</p>
    <p *ngIf="data.title">{{ data.title }}</p>
    <a mat-raised-button color="primary" href="{{data.tracking_url}}" target="_blank">购买链接</a>
    <button mat-raised-button (click)="dialog.close()">关闭</button>    
    `
})
export class VoucherCodeDialog {
    constructor(public dialog: MatDialogRef<VoucherCodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
    selector: 'topic-body',
    templateUrl: './topic.body.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicBody
{
    // The type of topic, some topic has slightly different head
    @Input() ttype: string;

    @Input() tabIdx: string;  // String index of default showing tab
    @Input() topic: Entity;

    today = new Date();

    constructor(public dialog: MatDialog) {}

    // Topic content
    get content() { return this.topic && this.topic.content; }

    // Posts of this topic
    //get posts() { return this.topic.posts; }

    // Offers of this topic
    get offers() { return this.topic && this.topic.offers; }

    get logoUrl() {
        if(this.topic.logo) {
            if (this.topic.logo[0] == 'h' && this.topic.logo[1] == 't')
                return this.topic.logo;
            return IMG_SERVER + '/' + this.topic.logo;
        }
    }

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

    // Convert MySQL date into number of days away from today
    expires(date) {
        let exp = new Date(date);
        let diff = exp.getTime() - this.today.getTime();
        if (diff < 0)
            return '已过期';
        else {
            let days = Math.ceil(diff / (1000*3600*24));
            if (days < 2)
                return '有效期：仅限今日';
            else if (days < 10)
                return '有效期：还剩' + days + '天';
            else
                return '有效期：随时失效';
        }
    }

    openVoucherDialog(title: string = null, vouchers: string = null,
                      tracking_url: string = null) {
        this.dialog.open(VoucherCodeDialog,
            {data: {title: title, vouchers: vouchers, tracking_url: tracking_url}});
    }
}
