// ✅ authMiddleware.js SIN refresh token
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        // Validar formato del header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Formato de autorización inválido. Use: Bearer <token>'
            });
        }

        const token = authHeader.split(' ')[1];

        // Validar que el token no esté vacío
        if (!token || token.trim() === '') {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        // Verificar JWT con configuración mejorada
        jwt.verify(token, process.env.JWT_SECRET, {
            issuer: 'api-aristmetica',
            audience: 'math-fun-kids',
        }, (err, decoded) => {
            if (err) {
                console.error('Error verificando token:', err.message);

                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: 'Token expirado',
                        code: 'TOKEN_EXPIRED'
                    });
                }

                if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({
                        message: 'Token inválido',
                        code: 'INVALID_TOKEN'
                    });
                }

                return res.status(403).json({
                    message: 'Token inválido o expirado',
                    code: 'TOKEN_ERROR'
                });
            }

            // Validar datos requeridos en el token
            if (!decoded.id || !decoded.email) {
                return res.status(403).json({
                    message: 'Token malformado',
                    code: 'MALFORMED_TOKEN'
                });
            }

            // Agregar información del usuario a la request
            req.user = {
                id: decoded.id,
                email: decoded.email,
                iat: decoded.iat,
            };

            next();
        });
    } catch (error) {
        console.error('Error en middleware de autenticación:', error);
        return res.status(500).json({
            message: 'Error interno del servidor',
            code: 'INTERNAL_ERROR'
        });
    }
};

export default authMiddleware;
