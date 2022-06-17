import pino from 'pino-http';

const pinoService = pino({ prettyPrint: true });

export default pinoService.logger;
