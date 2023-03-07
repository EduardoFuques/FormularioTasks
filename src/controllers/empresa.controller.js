import Form from "../models/Formulario";

export const renderFormem = async (req, res) => {
  try {
    const userID = req.session.passport.user;
    const { tipoDoc, usuario, nombre, apellido, email, codigoRepa } = req.user;
    const usuarioEncontrado = await Form.findOne({ usuario }).lean();
    if (!usuarioEncontrado) {
      const datos = {
        userID,
        tipoDoc,
        usuario,
        nombre,
        apellido,
        email,
      };
      const editar = false;
      res.render("indexEmpresa", {
        datos: datos,
        codigoRepa: codigoRepa,
        editar: editar,
      });
    } else {
      const datos = usuarioEncontrado;
      const editar = true;
      const calle = datos.domicilio[0].calle.toString();
      console.log(datos)
      res.render("editEmpresa", {
        datos: datos,
        codigoRepa: codigoRepa,
        domicilio: datos.domicilio[0],
        calle: calle,
        telefono: datos.telefono[0],
        editar: editar,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const captureFormEm = async (req, res) => {
  try {
    const {
      cuil,
      sexo,
      sitAfip,
      telFijo,
      movilPpal,
      movilAlt,
      localidad,
      cp,
      calle,
      numero,
      piso,
      dpto,
      razonSocial,
      nombreFantasia,
    } = req.body;
    const { tipoDoc, usuario, nombre, apellido, email } = req.user;

    const newForm = new Form({
      tipoDoc,
      usuario,
      nombre,
      apellido,
      email,
      cuil, //ok
      sexo, //ok
      sitAfip, //ok
      sitIaavim: true,
      domicilio: {
        calle: calle, //ok
        numero: numero, //ok
        piso: piso, //ok
        depto: dpto, //ok
        localidad: localidad,
        cp: cp, //ok
      }, //ok
      telefono: {
        fijo: telFijo,
        movil: movilPpal,
        alternativo: movilAlt,
      }, //ok
      razonSocial,
      nombreFantasia,
    });
    await newForm.save();
    //console.log(newForm)
    res.render("pantalla-ok");
  } catch (error) {
    console.log(error.message);
  }
};

export const captureEditFormEm = async (req, res) => {
  try {
    const {
      cuil,
      sexo,
      sitAfip,
      telFijo,
      movilPpal,
      movilAlt,
      localidad,
      cp,
      calle,
      numero,
      piso,
      dpto,
      razonSocial,
      nombreFantasia,
    } = req.body;
    const { tipoDoc, usuario, nombre, apellido, email, codigoRepa } = req.user;
    const editForm = {
      cuil, //ok
      sexo, //ok
      sitAfip, //ok
      domicilio: {
        calle: calle, //ok
        numero: numero, //ok
        piso: piso, //ok
        depto: dpto, //ok
        localidad: localidad,
        cp: cp, //ok
      }, //ok
      telefono: {
        fijo: telFijo,
        movil: movilPpal,
        alternativo: movilAlt,
      }, //ok
      razonSocial: razonSocial,
      nombreFantasia: nombreFantasia,
    };
    await Form.updateOne({ usuario: usuario }, { $set: editForm }, (error) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.render("pantalla-ok");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};