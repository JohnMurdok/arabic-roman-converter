export enum ContentTypeHeaderEnum {
    JSON = 'application/json',
    EVENT_STREAM = 'text/event-stream',
}

export enum ConnectionHeaderEnum {
    KEEP_ALIVE = 'keep-alive',
}

export enum CacheControlHeaderEnum {
    NO_CACHE = 'no-cache',
}

enum ResponseHeaderEnum {
    CONTENT_TYPE = 'Content-type',
    CONNECTION = 'Connection',
    CACHE_CONTROL = 'Cache-Control',
}

export default ResponseHeaderEnum;
