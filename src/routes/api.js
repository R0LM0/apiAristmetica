// ✅ Limpio y correcto
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"; // sin espacios y sin destructuring

const setupApiRoutes = (app, routes) => {
    const publicRouter = express.Router();
    publicRouter.use('/google-login', routes.authRoutes);
    app.use('/api', publicRouter);

    const protectedRouter = express.Router();
    protectedRouter.use(authMiddleware); // funciona porque es default
    // protectedRouter.use('/secure-data', secureRoutes);
    app.use('/api', protectedRouter);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Ruta no encontrada', path: req.originalUrl });
    });
};

export default setupApiRoutes;
