import Form from "../models/Formulario";

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

export const captureForm = async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    res.send("OK")
  } catch (error) {
    console.log(error.message);
  }
};
