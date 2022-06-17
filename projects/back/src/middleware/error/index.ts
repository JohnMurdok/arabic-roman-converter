import httpStatus from 'http-status';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import IHttpError from '@interfaces/error/IHttpError';
import logger from '@services/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err: IHttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message;

    logger.error(
        `[${status}] ${err.message} ${err.stack}`,
    );
    return res.status(status).send({ message, stack: err.stack });
};

export default errorMiddleware;
