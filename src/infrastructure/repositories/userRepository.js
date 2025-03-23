import User from "../database/models/usersModel.js";

class UserRepository {
    async createUser(userData) {
        return await User.create(userData);
    }

    async findByGoogleId(googleId) {
        return await User.findOne({ where: { google_id: googleId } });
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async findAll() {
        return await User.findAll();
    }
}

export default new UserRepository();
