
/**
 * Entity type constant
 */
export const ENTITY = {
    INVALID: 'invalid',
    OFFER:   'offer',
    PAGE:    'page',
    TOPIC:   'topic',
    POST:    'post',
    ADVERTISE: 'advertise',
    COMMENT: 'comment',
};

/**
 * Entity name, reducer selector and its url
 */
export const ENTITY_INFO = {
    'topic':     { selector: 'topics',     name: '专题', slug: 'topic' },
    'post':      { selector: 'posts',      name: '文章', slug: 'post'  },
    'offer':     { selector: 'offers',     name: '优惠', slug: 'offer' },
    'page':      { selector: 'pages',      name: '页面', slug: 'page'  },
    'advertise': { selector: 'advertises', name: '广告', slug: 'ads'   },
    'comment':   { selector: 'comments',   name: '评论', slug: 'comment' },
};

/**
 * Entity model of topic
 */
export class Entity {
    id: string;
    guid: string;
    channel_id: number;
    type_id: number;
    editor_id: number;
    author_id: number;
    image_id: number;
    images: any;
    type: number | string;
    status: string;
    // FIXME
    locations: any; //GeoLocation[]; // This array only contains 0 or 1 element
    title: string;
    // FIXME
    categoreis: any; //Category[];
    // FIXME
    topics: any; //Topic[];
    content: string;
    updated_at: string;
    offers: any; // FIXME: Replace 'any' with proper type
}


/**
 *TODO: add more attributes
 */
export class EntityParams {
    constructor(public key: string = 'default',  // key to idx EntitiesState
                public etype: string,            // Entity type
                public topic_type: string = null, // Topic type only if when querying topics
                public topic_has_offer: boolean = false, // If the topic has offer associated
                public per_page: number = 20,    // How many entities per page
                public page: number = 1,         // Which page going to be load
                public category: string = null,  // Category this entity belongs
                public topic: string = null,     // Topic this entity belongs
                public relations: string = null, // Relationships to be queried together
                public order_by: string = null,  // Sort entites by which column
                public order: string = null      // Sort order: asc or desc
    ) {}

    static toQueryString(e: EntityParams): string {
        return this._toString(e, '&');
    }

    static toBatchQueryString(e: EntityParams): string {
        return this._toString(e, ';');
    }

    static _toString(e: EntityParams, delimiter: string) {
        let s = 'key=' + e.key + delimiter + 'etype=' + e.etype;
        if (e.topic_type) s += delimiter + 'topic_type=' + e.topic_type;
        if (e.topic_has_offer) s += delimiter + 'topic_has_offer=' + e.topic_has_offer;
        if (e.per_page) s += delimiter + 'per_page=' + e.per_page;
        if (e.page) s += delimiter + 'page=' + e.page;
        if (e.category) s += delimiter + 'category=' + e.category;
        if (e.topic) s += delimiter + 'topic=' + e.topic;
        if (e.relations) s += delimiter + 'relations=' + e.relations;
        if (e.order_by) s += delimiter + 'order_by=' + e.order_by;
        if (e.order) s += delimiter + 'order=' + e.order;
        return s;
    }
}

