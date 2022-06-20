import EventEnum from '@enums/event';
import ResponseHeaderEnum, { CacheControlHeaderEnum, ConnectionHeaderEnum, ContentTypeHeaderEnum } from '@enums/header/response';
import IReponseHeader from '@interfaces/reponse/IResponseHeader';
import sseService from '@services/sse';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

class EventController {
    /**
     * Handle registration to SSE
     * @param req 
     * @param res 
     */
    register(req: Request, res: Response) {
        const clientUuid = sseService.createClient(res);

        const reponseHeaders = {
            [ResponseHeaderEnum.CACHE_CONTROL]: CacheControlHeaderEnum.NO_CACHE,
            [ResponseHeaderEnum.CONNECTION]: ConnectionHeaderEnum.KEEP_ALIVE,
            [ResponseHeaderEnum.CONTENT_TYPE]: ContentTypeHeaderEnum.EVENT_STREAM,
        } as IReponseHeader;

        res.writeHead(httpStatus.OK, reponseHeaders);

        req.on('close', () => {
            sseService.deleteClientByUuid(clientUuid);
        });

        sseService.sendMessageToClientUuid(clientUuid, {
            event: EventEnum.AUTHENTICATE,
            data: JSON.stringify({ clientUuid }),
        });
    }
}

export default new EventController();
