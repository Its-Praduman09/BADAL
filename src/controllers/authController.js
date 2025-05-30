import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  validatePasswordLogin,
  storeSessionKeys,
} from "../services/authService.js";
import ApiResponse from "../utils/apiResponse.js";

const JWT_SECRET = "your_jwt_secret_key";
const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "7d";

const generateKeys = (email, phone = "") => {
  const keyBase = email + phone;
  const privateKey = crypto
    .createHash("sha256")
    .update(keyBase + "private")
    .digest("hex");
  const publicKey = crypto
    .createHash("sha256")
    .update(keyBase + "public")
    .digest("hex");
  return { publicKey, privateKey };
};

class AuthController {
  static async login(req, res) {
    try {
      const { email, phone, password } = req.body;

      if (!password || !email) {
        return ApiResponse.error(res, "Email and password are required", 400);
      }

      const user = await validatePasswordLogin({ email, phone, password });

      if (!user) {
        return ApiResponse.unauthorized(res, "Invalid credentials");
      }

      const payload = { id: user.id, email: user.email };

      const { publicKey, privateKey } = generateKeys(user.email, user.phone);

      const accessToken = jwt.sign(payload, privateKey, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      });

      const refreshToken = jwt.sign(payload, privateKey, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      });

      const session = await storeSessionKeys(
        publicKey,
        privateKey,
        accessToken,
        refreshToken
      );

      return ApiResponse.success(
        res,
        {
          session_id: session.session_id,
          accessToken,
          refreshToken,
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          country_code: user.country_code,
          status: user.status,
        },
        "Login successful."
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.serverError(res);
    }
  }
}

export default AuthController;
