import { verifyAccessToken } from "../utils/jwt.js";
import ApiResponse from "../utils/apiResponse.js";

export const AuthMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const session_id = req.headers["auth-key"];

  console.log("AuthMiddleware - authorization header:", authorizationHeader);
  console.log("AuthMiddleware - session_id:", session_id);

  if (!authorizationHeader || !session_id) {
    return ApiResponse.unauthorized(res, "Unauthorized");
  }

  const decoded = await verifyAccessToken(session_id, authorizationHeader);

  if (!decoded) {
    return ApiResponse.unauthorized(res, "Unauthorized");
  }

  req.tokendata = decoded;
  next();
};
