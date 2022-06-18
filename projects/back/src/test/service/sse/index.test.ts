import EventEnum from '@enums/event';
import sseService from '@services/sse';
import { Response } from 'express';

jest.mock('@services/logger', () => ({
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'uuid'),
}));

const res = {
    write: jest.fn(),
} as unknown as Response;

describe('[SERVICES] SSEService', () => {
    test('createClient() - should return clientUuid', () => {
        const uuid = sseService.createClient(res);
        expect(uuid).toEqual('uuid');
        expect(sseService.getClients().size).toEqual(1);
    });

    test('deleteClientByUuid() - should return clientUuid', () => {
        sseService.deleteClientByUuid('uuid');
        expect(sseService.getClients().size).toEqual(0);
    });

    test('sendMessageToClientUuid() - should return false if client is not exists', () => {
        const result = sseService.sendMessageToClientUuid('uuid2', {
            event: EventEnum.AUTHENTICATE,
            data: '',
        });
        expect(result).toEqual(false);
    });

    test('sendMessageToClientUuid() - should return false if client is not exists', () => {
        const uuid = sseService.createClient(res);
        const result = sseService.sendMessageToClientUuid(uuid, {
            event: EventEnum.AUTHENTICATE,
            data: JSON.stringify({
                test: 1,
            }),
        });
        expect(result).toEqual(true);
        expect(res.write).toHaveBeenCalledTimes(4);
        expect(res.write).toHaveBeenCalledWith('id: uuid\n');
        expect(res.write).toHaveBeenCalledWith('event: authenticate\n');
        expect(res.write).toHaveBeenCalledWith('data: {\"test\":1}\n');
    });
});

