/**
 * Data model of topic entity
 */


export class Topic {
    id: number;
    guid: string;
    channel_id: number;
    channel: any;
    title: string;
    title_cn: string;
    logo: string;
    description: string;
    content: string;
    display_url: string;
    tracking_url: string;
    vouchers: string;
    updated_at: string;
}
