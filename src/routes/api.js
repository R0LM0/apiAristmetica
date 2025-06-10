import express from "express";
import rateLimit from 'express-rate-limit';
import authMiddleware from "../middlewares/authMiddleware.js";

const setupApiRoutes = (app, routes) => {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(limiter); // ⛔️ esto previene ataques DoS

    const publicRouter = express.Router();
    publicRouter.use('/google-login', routes.authRoutes);
    app.use('/api', publicRouter);

    const protectedRouter = express.Router();
    protectedRouter.use(authMiddleware);
    protectedRouter.use('/', routes.userRoutes);
    app.use('/api', protectedRouter);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Ruta no encontrada', path: req.originalUrl });
    });
};

export default setupApiRoutes;
