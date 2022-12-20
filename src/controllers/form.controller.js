import Form from "../models/Formulario";

export const renderForm = async (req, res) => {
  try {
    const userID = req.session.passport.user;
    const { tipoDoc, usuario, nombre, apellido, email } = req.user;
    const usuarioEncontrado = await Form.findOne({ usuario }).lean();
    if (!usuarioEncontrado){
      const datos = { userID, tipoDoc, usuario, nombre, apellido, email };
      res.render("index", { datos: datos });
      console.log("no hay usuario")
    } else {
      const datos = usuarioEncontrado;
      const calle = datos.domicilio[0].calle.toString()
      res.render("edit", { datos: datos, domicilio: datos.domicilio[0], calle: calle, telefono: datos.telefono[0]});
      console.log()
    }
    //res.render("/")
    
  } catch (error) {
    console.log(error.message);
  }
};

export const captureForm = async (req, res) => {
  try {
    const {
      cuil,
      sexo,
      perJuridica,
      sitAfip,
      telFijo,
      movilPpal,
      movilAlt,
      localidadID,
      cp,
      calle,
      numero,
      piso,
      dpto,
      medios,
      areaDes,
      areaComp,
      cv,
    } = req.body;
    const { tipoDoc, usuario, nombre, apellido, email } = req.user;
    const codigoRepa = "AA11";
    const newForm = new Form({
      tipoDoc,
      usuario,
      nombre,
      apellido,
      email,
      cuil, //ok
      sexo, //ok
      sitAfip, //ok
      sitIaavim: false,
      perJuridica, //ok
      codigoRepa: "AA11",
      domicilio: {
        calle: calle, //ok
        numero: numero, //ok
        piso: piso, //ok
        depto: dpto, //ok
        //localidad,
        cp: cp, //ok
        //departamento,
        //distrito
      }, //ok
      telefono: {
        fijo: telFijo,
        movil: movilPpal,
        alternativo: movilAlt,
      }, //ok
      medios, //ok
      areaDes, //ok
      areaComp, //ok
    });
    await newForm.save();
    res.send("OK");
  } catch (error) {
    console.log(error.message);
  }
};
