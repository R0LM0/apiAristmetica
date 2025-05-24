import { OAuth2Client } from 'google-auth-library';
import userRepository from '../infrastructure/repositories/userRepository.js';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // debe estar en tu .env
const SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

class LoginWithGoogleUseCase {
    async execute({ idToken }) {
        // 1. Verificar token con Google
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, name, email, picture } = payload;

        // 2. Verificar usuario o crear
        let user = await userRepository.findByGoogleId(sub);
        if (!user) {
            user = await userRepository.createUser({
                google_id: sub,
                name,
                email,
                photo_url: picture,
            });
        }

        // 3. Generar JWT local
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
            expiresIn: '1h',
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                photo_url: user.photo_url,
            },
        };
    }
}

export default new LoginWithGoogleUseCase();
