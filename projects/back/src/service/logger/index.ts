import pino from 'pino-http';

const pinoService = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
});

export default pinoService.logger;
