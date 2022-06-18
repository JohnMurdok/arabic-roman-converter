import http from 'http';
import ResponseHeaderEnum, { CacheControlHeaderEnum, ConnectionHeaderEnum, ContentTypeHeaderEnum } from '@enums/header/response';

interface IEventControllerReponseHeader extends http.OutgoingHttpHeaders {
    [ResponseHeaderEnum.CACHE_CONTROL]?: CacheControlHeaderEnum;
    [ResponseHeaderEnum.CONNECTION]?: ConnectionHeaderEnum;
    [ResponseHeaderEnum.CONTENT_TYPE]?: ContentTypeHeaderEnum;
}

export default IEventControllerReponseHeader;
