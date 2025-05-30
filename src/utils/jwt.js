import jwt from "jsonwebtoken";
import { getSessionData } from "../services/authService.js";

const verifyAccessToken = async (session_id, token) => {
  try {
    console.log("Verifying access token...");
    const session = await getSessionData(session_id);

    if (!session) {
      return null;
    }

    const tokenParts = token.split(" ");
    const tokenToVerify = tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];

    const decoded = jwt.verify(tokenToVerify, session.private_key, {
      algorithms: ["HS256"],
    });

    return decoded;
  } catch (error) {
    return null;
  }
};

export { verifyAccessToken };
