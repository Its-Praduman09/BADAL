import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const { Users, SessionKeys } = db;

export const validatePasswordLogin = async ({ email, password }) => {
  const user = await Users.findOne({
    where: {
      email,
      status: 0,
    },
  });

  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return false;

  return user;
};

export const storeSessionKeys = (
  publicKey,
  privateKey,
  accessToken = null,
  refreshToken = null
) => {
  return SessionKeys.create({
    session_id: uuidv4(),
    public_key: publicKey.toString(),
    private_key: privateKey.toString(),
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

export const getSessionData = (session_id) => {
  return SessionKeys.findOne({ where: { session_id } });
};
