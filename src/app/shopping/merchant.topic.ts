import { Component }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../core/reducers';
import { EntityBase }        from '../core';
import { ENTITY }            from '../core/models';
import { environment }       from "../../environments/environment";

@Component({ templateUrl: './merchant.topic.html' })
export class _MerchantTopic extends EntityBase
{
    // Variables used in template only
    isGeneralTopic: boolean;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>) {
        super(ENTITY.TOPIC, route, store);
    }

    // Mock up data for the topic
    topic = {
        comments: [
            {from: 'Aries', msg: '好喜欢这个产品啊, 下次继续买'},
            {from: 'Bonnie', msg: '这个产品一般般了, 下次买其他品牌'},
            {from: 'Aries', msg: '好喜欢这个产品啊, 下次继续买'},
            {from: 'Bonnie', msg: '这个产品一般般了, 下次买其他品牌'},
            {from: 'Aries', msg: '好喜欢这个产品啊, 下次继续买'},
            {from: 'Bonnie', msg: '这个产品一般般了, 下次买其他品牌'},
        ],
    };
}

@Component({ templateUrl: './merchant.topic.m.html' })
export class _MerchantTopicMobile extends EntityBase
{
    // Variables used in template only
    isGeneralTopic: boolean;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>) {
        super(ENTITY.TOPIC, route, store);
    }
}

export const MerchantTopic =
    environment.mobile ? _MerchantTopicMobile : _MerchantTopic;
