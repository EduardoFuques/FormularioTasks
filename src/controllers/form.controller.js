import Form from "../models/Formulario";

export const renderForm = async (req, res) => {
  try {
    const userID = req.session.passport.user;
    const { tipoDoc, usuario, nombre, apellido, email, codigoRepa } = req.user;
    const usuarioEncontrado = await Form.findOne({ usuario }).lean();
    if (!usuarioEncontrado) {
      const datos = { userID, tipoDoc, usuario, nombre, apellido, email, codigoRepa };
      res.render("index", { datos: datos });
    } else {
      const datos = usuarioEncontrado;
      const medios = []
      const areaDesem = []
      const areaCompl = []
      for (let i = 0; i < datos.medios.length; i++) {
        medios.push(datos.medios[i]);
      }
      for (let i = 0; i < datos.areaDes.length; i++) {
        areaDesem.push(datos.areaDes[i]);
      }
      for (let i = 0; i < datos.areaComp.length; i++) {
        areaCompl.push(datos.areaComp[i]);
      }

      const calle = datos.domicilio[0].calle.toString();
      res.render("edit", {
        datos: datos,
        domicilio: datos.domicilio[0],
        calle: calle,
        telefono: datos.telefono[0],
        medios: medios,
        areaDesem: areaDesem,
        areaCompl: areaCompl
      });
    }

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
      localidad,
      cp,
      calle,
      numero,
      piso,
      dpto,
      medios,
      areaDes,
      areaComp,
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
      perJuridica, //ok
      domicilio: {
        calle: calle, //ok
        numero: numero, //ok
        piso: piso, //ok
        depto: dpto, //ok
        localidad: localidad,
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
    //console.log(newForm)
    res.render("pantalla-ok");
  } catch (error) {
    console.log(error.message);
  }
};

export const captureEditForm = async (req, res) => {
  try {
    const {
      cuil,
      sexo,
      perJuridica,
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
      medios,
      areaDes,
      areaComp,
      cv,
    } = req.body;
    const { tipoDoc, usuario, nombre, apellido, email } = req.user;
    const codigoRepa = "AA11";
    const editForm = {
      cuil, //ok
      sexo, //ok
      sitAfip, //ok
      perJuridica, 
      domicilio: {
        calle: calle, //ok
        numero: numero, //ok
        piso: piso, //ok
        depto: dpto, //ok
        localidad: localidad,
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
      
    };
    await Form.updateOne({usuario: usuario}, {$set: editForm}, (error) => {
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
