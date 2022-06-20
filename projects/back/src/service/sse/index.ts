// import IEventMessage from '@interfaces/message/IEventMessage';
import IEventMessage from '@interfaces/message/IEventMessage';
import logger from '@services/logger';
import { Response } from 'express';
import { v4 as uuidGenerator } from 'uuid';

class SSEService {
    private clients = new Map<string, Response>();

    getClients() {
        return this.clients;
    }

    /**
     * Create client method
     * @param res 
     */
    createClient(res: Response): string {
        const clientUuid = uuidGenerator();
        logger.info(`[SSEService] Create client with uuid "${clientUuid}"`);
        this.clients.set(clientUuid, res);
        return clientUuid;
    }

    /**
     * Delete client by uuid method
     * @param clientUuid 
     */
    deleteClientByUuid(clientUuid: string): SSEService {
        this.clients.delete(clientUuid);
        logger.info(`[SSEService] Delete client with uuid "${clientUuid}"`);
        return this;
    }

    /**
     * Send message to a specific client
     * @param clientUuid
     * @param message
     * @returns
     */
    sendMessageToClientUuid(clientUuid: string, eventMessage: IEventMessage): boolean {
        const client = this.clients.get(clientUuid);
        if (!client) {
            logger.error(`[SSEService] Client with "${clientUuid}" is not registered`);
            return false;
        }
        this.sendMessage(client, {
            id: uuidGenerator(),
            ...eventMessage,
        });
        logger.info(`[SSEService] Sending message ${eventMessage} to ${clientUuid}"`);

        return true;
    }

    /**
     * Send message function
     * @param client 
     * @param message 
     */
    private sendMessage(client: Response, eventMessage: IEventMessage): void {
        const message = eventMessage as unknown as Record<string, string>;
        Object.keys(message).forEach((key: string) => {
            logger.info(`${key}: ${message[key]}\n`);
            client.write(`${key}: ${message[key]}\n`);
        });
        client.write('\n');
    }
}

export default new SSEService();
