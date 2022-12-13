import Form from "../models/Formulario";
import * as domicilio from "../libs/domicilios"

export const renderForm = async (req, res) => {
  try {
    const userID = req.session.passport.user
    const {tipoDoc, usuario, nombre, apellido, email} = req.user;
    const datos = {userID, tipoDoc, usuario, nombre, apellido, email};
    res.render("index", { datos: datos});
  } catch (error) {
    console.log(error.message);
  }
};
