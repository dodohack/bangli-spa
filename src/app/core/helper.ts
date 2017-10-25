/**
 * Injectable helper class provide many common functions
 */
import { Injectable } from '@angular/core';

import { Entity } from './models';
import { IMG_SERVER, THUMBS } from '../../../.config';

@Injectable()
export class Helper
{
    today = new Date();

    /**
     * Test if an object is undefined or not.
     * @param obj
     * @returns {boolean}
     */
    public isUndefinedOrNull(obj: any) {
        return typeof obj === 'undefined' || obj === undefined || obj === null;
    }

    //
    // String concat or shorten
    //

    /**
     * Shorten text to given length
     * @param text
     * @param length
     */
    public shorten(text: string, length: number = 80) {
        // Shorten long text
        if (text.length < length) return text;
        else return text.substr(0, length) + '...';
    }

    /**
     * Return offer title for given topic
     * @param topic
     * @param length
     * @returns {any}
     */
    public offerTitle(topic: Entity, length: number) {
        if (topic && topic.offers && topic.offers.length) {
            // Find featured offer
            let offer = topic.offers.find(ele => ele.featured);

            // If we don't have featured offer
            if (!offer) {
                offer = topic.offers[0];
            }

            // Shorten long text
            return this.shorten(offer.title, length);
        }
    }

    //
    // Date helpers
    //

    /**
     * Convert MySQL date into number of days away from today
     * @param date
     * @returns {any}
     */
    public expireDate(date: string) {
        let exp = new Date(date);
        let diff = exp.getTime() - this.today.getTime();
        if (diff < 0)
            return '已过期';
        else {
            let days = Math.ceil(diff / (1000 * 3600 * 24));
            if (days < 2)
                return '有效期：仅限今日';
            else if (days < 10)
                return '有效期：还剩' + days + '天';
            else
                return '有效期：随时失效';
        }
    }

    // Image and thumbnail helps

    /**
     * Get topic logo url
     * @param topic
     * @returns {any}
     */
    public topicLogoUrl(topic: Entity) {
        if (topic && topic.logo)
            return this.absUrl(topic.logo);

        return "http://placehold.it/64x64?text=logo";
    }

    /**
     * Get absolute image url
     * @param topic
     * @returns {any}
     */
    public absUrl(uri: string) {
        if (uri && uri[0] == 'h' && uri[1] == 't')
            return uri;
        else
            return IMG_SERVER + '/' + uri;
    }

    /**
     * Get 2:1 thumbnail url with random featured image or given index
     * @param entity
     * @param idx - featured image index, normally 0
     */
    public thumb21Url(entity: Entity, idx: number) {
        if (entity && entity.images && entity.images.length) {
            if (typeof idx === 'undefined' || idx === undefined)
                idx = Math.floor(Math.random() * entity.images.length);
            let img = entity.images[idx];
            if (img.thumbnail) {
                let thumbs = JSON.parse(img.thumbnail);
                return IMG_SERVER + '/' + img.thumb_path + thumbs[THUMBS.THUMB_CARD_21].file;
            }
        }

        return "http://placehold.it/400x200?text=img";
    }

    /**
     * Return number of offers this topic has
     * @param topic
     * @returns {any}
     */
    public offerCount(topic: Entity) {
        if (topic && topic.offers) return topic.offers.length;
        return 0;
    }
}
