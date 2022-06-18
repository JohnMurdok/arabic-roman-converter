import express from 'express';
const router = express.Router();
const ROUTES: Record<string, string> = {
    '/events': './event',
};

Object.keys(ROUTES).forEach(async (route) => {
    const path = ROUTES[route];
    router.use(route, require(path).default);
});

export default router;
