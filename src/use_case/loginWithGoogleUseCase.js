import { OAuth2Client } from 'google-auth-library';
import userRepository from '../infrastructure/repositories/userRepository.js';
import jwt from 'jsonwebtoken';

// Validar configuración de entorno
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID no está configurado en las variables de entorno');
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está configurado en las variables de entorno');
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const SECRET = process.env.JWT_SECRET;

class LoginWithGoogleUseCase {
    async execute({ idToken }) {
        try {
            // Validación de entrada
            if (!idToken || typeof idToken !== 'string') {
                throw new Error('Token de Google inválido o no proporcionado');
            }

            // 1. Verificar token con Google con timeout
            const ticket = await Promise.race([
                client.verifyIdToken({
                    idToken,
                    audience: [process.env.GOOGLE_CLIENT_ID],
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout verificando token de Google')), 10000)
                )
            ]);

            const payload = ticket.getPayload();
            const { sub, name, email, picture } = payload;

            // Validar datos requeridos del payload
            if (!sub || !name || !email) {
                throw new Error('Datos de usuario incompletos en el token de Google');
            }

            // 2. Verificar usuario o crear con transacción
            let user = await userRepository.findByGoogleId(sub);
            if (!user) {
                user = await userRepository.createUser({
                    google_id: sub,
                    name,
                    email,
                    photo_url: picture,
                });
            } else {
                // Actualizar datos del usuario si han cambiado
                if (user.name !== name || user.email !== email || user.photo_url !== picture) {
                    user = await userRepository.updateUser(user.id, {
                        name,
                        email,
                        photo_url: picture,
                    });
                }
            }

            // 3. Generar JWT con configuración mejorada
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    iat: Math.floor(Date.now() / 1000),
                },
                SECRET,
                {
                    expiresIn: '24h', // Aumentar tiempo de expiración
                    issuer: 'api-aristmetica',
                    audience: 'math-fun-kids',
                }
            );

            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    photo_url: user.photo_url,
                },
            };
        } catch (error) {
            console.error('Error en login con Google:', error.message);

            // Manejar errores específicos
            if (error.message.includes('Timeout')) {
                throw new Error('Error de conexión con Google. Inténtalo de nuevo.');
            }

            if (error.message.includes('Token')) {
                throw new Error('Token de Google inválido o expirado.');
            }

            throw new Error('Error interno del servidor durante el login.');
        }
    }
}

export default new LoginWithGoogleUseCase();
