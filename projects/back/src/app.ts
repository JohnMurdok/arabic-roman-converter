import express from 'express';
import errorMiddleware from '@middlewares/error';
import apolloServer from './apollo';

const app = express();

/**
 * Main entry point
 */
const startServer = async (): Promise<void> => {
    try {
        await apolloServer.start();

        app.use('/graphql', apolloServer.getMiddleware({ path: '/' }));
        app.use(errorMiddleware);
        app.listen({
            port: process.env.SERVER_PORT,
        }, () => {
            console.log(`Server ready on ${process.env.SERVER_PORT}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

export default startServer();
