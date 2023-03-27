import User from "../models/Usuarios";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateResetPasswordToken = async (email) => {
  const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora en milisegundos
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error(
      "No se encontró ningún usuario con el correo electrónico proporcionado"
    );
  }
  const payload = { email: user.email }; // incluir el email del usuario en el payload
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME }); // generar un JWT con el payload y una clave secreta
  const now = new Date();
  const expirationTime = new Date(now.getTime() + TOKEN_EXPIRATION_TIME); // calcular la hora de expiración
  user.resetPasswordToken = token;
  user.resetPasswordExpiration = expirationTime;
  await user.save();
  return token;
};

export const verifyResetPasswordToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET); // verificar y decodificar el token
    const email = decodedToken.email; // obtener el email del usuario desde el payload
    const user = await User.findOne({ email: email });
    if (!user || user.resetPasswordToken !== token) {
      throw new Error('El token no es válido');
    }
    const now = new Date();
    if (now > user.resetPasswordExpiration) {
      throw new Error('El token ha expirado');
    }
    await user.save();
    return user;
  } catch (error) {
    throw new Error('El token no es válido');
  }
};

