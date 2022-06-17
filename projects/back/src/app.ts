import express from 'express';

const app = express();

/**
 * Main entry point
 */
const startServer = async (): Promise<void> => {
    try {
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
