import jwt from "jsonwebtoken";
import { getSessionData } from "../services/authService.js";

const verifyAccessToken = async (session_id, token) => {
  try {
    console.log("Verifying access token...");
    console.log("Session ID:", session_id);
    const session = await getSessionData(session_id);

    if (!session) {
      console.log("No session found for session_id:", session_id);
      return null;
    }

    console.log("Session private key:", session.private_key);
    console.log("Raw token:", token);

    const tokenParts = token.split(" ");
    const tokenToVerify = tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];

    console.log("Token to verify:", tokenToVerify);

    const decoded = jwt.verify(tokenToVerify, session.private_key, {
      algorithms: ["HS256"],
    });

    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.log("Token verification error:", error.message);
    return null;
  }
};

export { verifyAccessToken };
