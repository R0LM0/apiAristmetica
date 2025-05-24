import loginWithGoogleUseCase from "../../use_case/loginWithGoogleUseCase.js";

class AuthController {
    async loginWithGoogle(req, res) {
        try {
            const googleUserData = req.body;
            // console.log("Google user data:", googleUserData);
            const result = await loginWithGoogleUseCase.execute(googleUserData);

            res.status(200).json(result);
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Error en login" });
        }
    }
}

export default new AuthController();
