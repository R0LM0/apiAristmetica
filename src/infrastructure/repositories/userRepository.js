import User from "../database/models/usersModel.js";

class UserRepository {
    async createUser(userData) {
        // Validar datos requeridos
        if (!userData.google_id || !userData.name || !userData.email) {
            throw new Error('Datos de usuario incompletos');
        }

        return await User.create(userData);
    }

    async updateUser(id, updateData) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return await user.update(updateData);
    }

    async findByGoogleId(googleId) {
        if (!googleId) {
            throw new Error('Google ID es requerido');
        }

        return await User.findOne({ where: { google_id: googleId } });
    }

    async findByEmail(email) {
        if (!email) {
            throw new Error('Email es requerido');
        }

        return await User.findOne({ where: { email } });
    }

    async findById(id) {
        if (!id) {
            throw new Error('ID es requerido');
        }

        return await User.findByPk(id);
    }

    async findAll(options = {}) {
        const { limit = 50, offset = 0, order = [['created_at', 'DESC']] } = options;

        return await User.findAll({
            limit,
            offset,
            order,
        });
    }
}

export default new UserRepository();
