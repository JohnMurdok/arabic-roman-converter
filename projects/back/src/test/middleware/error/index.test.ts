import { Request, Response } from 'express';
import errorMiddleware from '@middlewares/error';

jest.mock('@services/logger', () => ({
    error: jest.fn(),
}));

const res = {
    status: jest.fn(),
    send: jest.fn(),
};
res.status.mockReturnValue(res);
res.send.mockImplementation((value: string) => value);

describe('[MIDDLEWARE] errorMiddleware()', () => {
    test('should return err message and stack', () => {
        const error = {
            status: 404,
            message: 'message',
            stack: 'stack',
        };
        const req = {} as unknown as Request;
        errorMiddleware(error, req, res as unknown as Response, jest.fn());
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: 'message', stack: 'stack' });
    });
});
