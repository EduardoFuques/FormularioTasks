import Form from "../models/Formulario";
import User from "../models/Usuarios";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import {
  areasCompOpc,
  areaDesOpc,
  mediosopc,
  domiciliosOpc,
} from "../helpers/arrays";
import { format } from "date-fns";
import validator from "validator";

export const renderForm = async (req, res) => {
  try {
    const userID = req.session.passport.user;
    const { tipoDoc, usuario, nombre, apellido, email, codigoRepa } = req.user;
    const usuarioEncontrado = await Form.findOne({ usuario: usuario }).lean();
    if (!usuarioEncontrado) {
      const datos = {
        userID,
        tipoDoc,
        usuario,
        nombre,
        apellido,
        email,
      };
      const activo = false;
      const perJur = false;
      const editar = false;
      res.render("index", {
        datos: datos,
        codigoRepa: codigoRepa,
        editar: editar,
        perJur: perJur,
        activo: activo,
      });
    } else {
      const datos = usuarioEncontrado;
      const medios = [];
      const areaDesem = [];
      const areaCompl = [];
      for (let i = 0; i < datos.medios.length; i++) {
        medios.push(datos.medios[i]);
      }
      for (let i = 0; i < datos.areaDes.length; i++) {
        areaDesem.push(datos.areaDes[i]);
      }
      for (let i = 0; i < datos.areaComp.length; i++) {
        areaCompl.push(datos.areaComp[i]);
      }
      const editar = true;
      const perJur = false;
      const activo = datos.sitIaavim;
      const calle = datos.domicilio[0].calle.toString();
      const formattedDNIDate = format(datos.dniFileDate, "dd/MM/yyyy");
      const formattedCVDate = format(datos.cvFileDate, "dd/MM/yyyy");
      res.render("edit", {
        datos: datos,
        activo: activo,
        codigoRepa: codigoRepa,
        domicilio: datos.domicilio[0],
        calle: calle,
        telefono: datos.telefono[0],
        medios: medios,
        areaDesem: areaDesem,
        areaCompl: areaCompl,
        editar: editar,
        perJur: perJur,
        formattedDNIDate: formattedDNIDate,
        formattedCVDate: formattedCVDate,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const captureForm = async (req, res) => {
  try {
    console.log(req.body)
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
      medios,
      areaDes,
      areaComp,
    } = req.body;
    const { tipoDoc, usuario, nombre, apellido, email } = req.user;
    const VtipoDoc = validator.escape(tipoDoc);
    const Vusuario = validator.escape(usuario);
    const Vnombre = validator.escape(nombre);
    const Vapellido = validator.escape(apellido);
    const Vcuil = validator.escape(cuil);
    const Vsexo = validator.escape(sexo);
    const VsitAfip = validator.escape(sitAfip);
    const VtelFijo = telFijo === "/" ? telFijo : validator.escape(telFijo);
    const VmovilPpal = movilPpal === "/" ? movilPpal : validator.escape(movilPpal);
    const VmovilAlt = movilAlt === "/" ? movilAlt : validator.escape(movilAlt);
    const Vlocalidad = validator.escape(localidad);
    const Vcp = validator.escape(cp);
    const Vcalle = calle === "/" ? calle : validator.escape(calle);
    const Vnumero = numero === "/" ? numero : validator.escape(numero);
    const Vpiso = piso === "/" ? piso : validator.escape(piso);
    const Vdpto = dpto === "/" ? dpto : validator.escape(dpto);
    const isEmailValid = validator.isEmail(email)
    let Vmedios;
    if (Array.isArray(medios)) {
      Vmedios = medios.map((medio) => validator.escape(medio));
    } else {
      Vmedios = validator.escape(medios)
    }
    let VareaDes;
    if (Array.isArray(areaDes)) {
      VareaDes = areaDes.map((areaDes) => validator.escape(areaDes));
    } else {
      VareaDes = validator.escape(areaDes)
    }
    let VareaComp;
    if (Array.isArray(areaComp)) {
      VareaComp = areaComp.map((areaComp) => validator.escape(areaComp));
    } else if (typeof areaComp === "string") {
      VareaComp = validator.escape(areaComp);
    } else {
      VareaComp = areaComp;
    }
    let Vemail;
    let errorMessage = "";
    if (isEmailValid) {
      Vemail = email;
    } else {
      errorMessage = "Ha ocurrido un error. Póngase en contacto con administración"
      req.flash("error", errorMessage);
      return res.redirect("/logout");
    }

    //---------------------------------------------------------------------------
    const obtCodigoRepa = await User.findOne({ usuario: Vusuario }).lean();
    let codigoRepa = obtCodigoRepa.codigoRepa
    const cvFileUrl = `${encodeURIComponent(
      req.protocol
    )}://${encodeURIComponent(req.get("host"))}/files/${codigoRepa}/${encodeURIComponent(req.files.cvFile[0].filename)}`;
    const dniFileUrl = `${encodeURIComponent(
      req.protocol
    )}://${encodeURIComponent(req.get("host"))}/files/${codigoRepa}/${encodeURIComponent(req.files.dniFile[0].filename)}`;
    const cvFilename = encodeURIComponent(req.files.cvFile[0].filename);
    const cvFileDate = cvFilename.substring(
      cvFilename.lastIndexOf("-") + 1,
      cvFilename.lastIndexOf(".")
    );
    const cvFileDateISO = cvFileDate.replace(
      /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1-$2-$3T$4:$5:00Z"
    );
    const dniFilename = encodeURIComponent(req.files.dniFile[0].filename);
    const dniFileDate = dniFilename.substring(
      dniFilename.lastIndexOf("-") + 1,
      dniFilename.lastIndexOf(".")
    );
    const dniFileDateISO = dniFileDate.replace(
      /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1-$2-$3T$4:$5:00Z"
    );

    //---------------------------------------------------------------------------

    const newForm = new Form({
      tipoDoc: VtipoDoc,
      usuario: Vusuario,
      nombre: Vnombre,
      apellido: Vapellido,
      email: Vemail,
      cuil: Vcuil, //ok
      sexo: Vsexo, //ok
      sitAfip: VsitAfip, //ok
      sitIaavim: false,
      domicilio: {
        calle: Vcalle, //ok
        numero: Vnumero, //ok
        piso: Vpiso, //ok
        depto: Vdpto, //ok
        localidad: Vlocalidad,
        cp: Vcp, //ok
      }, //ok
      telefono: {
        fijo: VtelFijo,
        movil: VmovilPpal,
        alternativo: VmovilAlt,
      }, //ok
      medios: Vmedios, //ok
      areaDes: VareaDes, //ok
      areaComp: VareaComp, //ok
      cvFileUrl,
      cvFileDate: new Date(cvFileDateISO),
      dniFileUrl,
      dniFileDate: new Date(dniFileDateISO),
    });
    await newForm.save();
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
    const { usuario } = req.user;
    const Vusuario = validator.escape(usuario);
    const Vcuil = validator.escape(cuil);
    const Vsexo = validator.escape(sexo);
    const VsitAfip = validator.escape(sitAfip);
    const VtelFijo = telFijo === "/" ? telFijo : validator.escape(telFijo);
    const VmovilPpal =
      movilPpal === "/" ? movilPpal : validator.escape(movilPpal);
    const VmovilAlt = movilAlt === "/" ? movilAlt : validator.escape(movilAlt);
    const Vlocalidad = validator.escape(localidad);
    const Vcp = validator.escape(cp);
    const Vcalle = calle === "/" ? calle : validator.escape(calle);
    const Vnumero = numero === "/" ? numero : validator.escape(numero);
    const Vpiso = piso === "/" ? piso : validator.escape(piso);
    const Vdpto = dpto === "/" ? dpto : validator.escape(dpto);
    let Vmedios;
    if (Array.isArray(medios)) {
      Vmedios = medios.map((medio) => validator.escape(medio));
    } else {
      Vmedios = validator.escape(medios)
    }
    let VareaDes;
    if (Array.isArray(areaDes)) {
      VareaDes = areaDes.map((areaDes) => validator.escape(areaDes));
    } else {
      VareaDes = validator.escape(areaDes)
    }
    let VareaComp;
    if (Array.isArray(areaComp)) {
      VareaComp = areaComp.map((areaComp) => validator.escape(areaComp));
    } else if (typeof areaComp === "string") {
      VareaComp = validator.escape(areaComp);
    } else {
      VareaComp = areaComp;
    }
    const obtCodigoRepa = await User.findOne({ usuario: Vusuario }).lean();
    const usuarioEncontrado = await Form.findOne({ usuario: Vusuario }).lean();
    let codigoRepa = obtCodigoRepa.codigoRepa
    let cvFileUrl;
    let cvFilename;
    let cvFileDate;
    let cvFileDateISO;
    if (
      req.files.cvFile &&
      req.files.cvFile.length > 0 &&
      req.files.cvFile[0].filename
    ) {
      cvFileUrl = `${encodeURIComponent(req.protocol)}://${encodeURIComponent(
        req.get("host")
      )}/files/${codigoRepa}/${encodeURIComponent(
        req.files.cvFile[0].filename
      )}`;
      cvFilename = encodeURIComponent(req.files.cvFile[0].filename);
      cvFileDate = cvFilename.substring(
        cvFilename.lastIndexOf("-") + 1,
        cvFilename.lastIndexOf(".")
      );
      cvFileDateISO = new Date(
        cvFileDate.replace(
          /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/,
          "$1-$2-$3T$4:$5:00Z"
        )
      );
    } else {
      cvFileUrl = usuarioEncontrado.cvFileUrl;
      cvFileDateISO = usuarioEncontrado.cvFileDate;
    }
    let dniFileUrl;
    let dniFilename;
    let dniFileDate;
    let dniFileDateISO;
    if (
      req.files.dniFile &&
      req.files.dniFile.length > 0 &&
      req.files.dniFile[0].filename
    ) {
      dniFileUrl = `${encodeURIComponent(req.protocol)}://${encodeURIComponent(
        req.get("host")
      )}/files/${codigoRepa}/${encodeURIComponent(
        req.files.dniFile[0].filename
      )}`;
      dniFilename = encodeURIComponent(req.files.dniFile[0].filename);
      dniFileDate = dniFilename.substring(
        dniFilename.lastIndexOf("-") + 1,
        dniFilename.lastIndexOf(".")
      );
      dniFileDateISO = new Date(
        dniFileDate.replace(
          /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/,
          "$1-$2-$3T$4:$5:00Z"
        )
      );
    } else {
      dniFileUrl = usuarioEncontrado.dniFileUrl;
      dniFileDateISO = usuarioEncontrado.dniFileDate;
    }

    const editForm = {
      cuil: Vcuil, //ok
      sexo: Vsexo, //ok
      sitAfip: VsitAfip, //ok
      domicilio: {
        calle: Vcalle, //ok
        numero: Vnumero, //ok
        piso: Vpiso, //ok
        depto: Vdpto, //ok
        localidad: Vlocalidad,
        cp: Vcp, //ok
      }, //ok
      telefono: {
        fijo: VtelFijo,
        movil: VmovilPpal,
        alternativo: VmovilAlt,
      }, //ok
      medios: Vmedios, //ok
      areaDes: VareaDes, //ok
      areaComp: VareaComp, //ok
      cvFileUrl,
      cvFileDate: new Date(cvFileDateISO),
      dniFileUrl,
      dniFileDate: new Date(dniFileDateISO),
    };
    await Form.updateOne({ usuario: Vusuario }, { $set: editForm }, (error) => {
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

export const renderPDF = async (req, res) => {
  try {
    //   Recuperar datos del usuario
    const userID = req.session.passport.user;
    const { tipoDoc, usuario, nombre, apellido, email, codigoRepa } = req.user;
    const usuarioEncontrado = await Form.findOne({ usuario }).lean();
    let tempFilePath = null; // Inicializar la variable tempFilePath con null
    if (!usuarioEncontrado) {
      const datos = {
        userID,
        tipoDoc,
        usuario,
        nombre,
        apellido,
        email,
      };

      res.render("index", { datos: datos, codigoRepa: codigoRepa });
    } else {
      const datos = usuarioEncontrado;
      const mediosi = [];
      const areaDesemi = [];
      const areaCompli = [];

      for (let i = 0; i < datos.medios.length; i++) {
        mediosi.push(datos.medios[i]);
      }
      for (let i = 0; i < datos.areaDes.length; i++) {
        areaDesemi.push(datos.areaDes[i]);
      }
      for (let i = 0; i < datos.areaComp.length; i++) {
        areaCompli.push(datos.areaComp[i]);
      }
      const medios = mediosi.map((indice) => mediosopc[indice].medio);
      const areaDesem = areaDesemi.map((indice) => areaDesOpc[indice].medio);
      const areaCompl = areaCompli.map((indice) => areasCompOpc[indice].medio);

      const calle = datos.domicilio[0].calle.toString();
      const telefono = datos.telefono[0];
      const domicilio = datos.domicilio[0];

      // Obtener el índice de la localidad del objeto domicilio
      const indiceLocalidad = domicilio.localidad;
      // Buscar el objeto de la localidad en el array domiciliosOpc
      const indiceLocalidadNumero = parseInt(indiceLocalidad, 10);
      const localidadOpc = domiciliosOpc.find(
        (opc) => opc.opciones.indice === indiceLocalidadNumero
      );
      // Obtener el nombre de la localidad
      const nombreLocalidad = localidadOpc ? localidadOpc.localidad : "";

      const doc = async () => {
        try {
          // Cargar el archivo PDF
          const pdfData = fs.readFileSync("PDF_PF_FORM.pdf");
          const pdfDoc = await PDFDocument.load(pdfData);
          const form = pdfDoc.getForm();
          const nombresField = form.getField("Nombres");
          const apellidoField = form.getField("Apellido");
          const tipoDocField = form.getField("TipoDoc");
          const numDocField = form.getField("NumDoc");
          const cuilField = form.getField("Cuil");
          const sitAfipField = form.getField("SitAfip");
          const codRepaField = form.getField("CodRepa");
          const fijoField = form.getField("Fijo");
          const movilField = form.getField("Movil");
          const movilAltField = form.getField("MovilAlt");
          const emailField = form.getField("email");
          const sexoField = form.getField("sexo");
          const departamentoField = form.getField("Departamento");
          const cpField = form.getField("CP");
          const distritoField = form.getField("Distrito");
          const localidadField = form.getField("Localidad");
          const calleField = form.getField("Calle");
          const numeroField = form.getField("Numero");
          const pisoField = form.getField("Piso");
          const deptoField = form.getField("Depto");
          const areaComp1Field = form.getField("AreaComp1");
          const areaComp2Field = form.getField("AreaComp2");
          const areaDes3Field = form.getField("AreaDes3");
          const areaComp3Field = form.getField("AreaComp3");
          const medio1Field = form.getField("Medio1");
          const medio2Field = form.getField("Medio2");
          const medio3Field = form.getField("Medio3");
          const areaDes2Field = form.getField("AreaDes2");
          const areaDes1Field = form.getField("AreaDes1");
          nombresField.setText("  " + datos.nombre.toString());
          apellidoField.setText("  " + datos.apellido.toString());
          tipoDocField.setText("  " + datos.tipoDoc.toString());
          numDocField.setText("  " + datos.usuario.toString());
          cuilField.setText("  " + datos.cuil.toString());
          sitAfipField.setText("  " + datos.sitAfip.toString());
          codRepaField.setText(codigoRepa.toString());
          fijoField.setText("  " + telefono.fijo.toString());
          movilField.setText("  " + telefono.movil.toString());
          movilAltField.setText("  " + telefono.alternativo.toString());
          emailField.setText("  " + datos.email.toString());
          sexoField.setText("  " + datos.sexo.toString());
          cpField.setText("  " + domicilio.cp.toString());
          departamentoField.setText("  " + localidadOpc.opciones.Departamento);
          distritoField.setText("  " + localidadOpc.opciones.Distrito);
          calleField.setText("  " + calle.toString());
          numeroField.setText("  " + domicilio.numero.toString());
          pisoField.setText("  " + domicilio.piso.toString());
          deptoField.setText("  " + domicilio.depto.toString());
          areaComp1Field.setText("  " + (areaCompl[0] ?? ""));
          areaComp2Field.setText("  " + (areaCompl[1] ?? ""));
          areaComp3Field.setText("  " + (areaCompl[2] ?? ""));
          medio1Field.setText("  " + (medios[0] ?? ""));
          medio2Field.setText("  " + (medios[1] ?? ""));
          medio3Field.setText("  " + (medios[2] ?? ""));
          areaDes1Field.setText("  " + (areaDesem[0] ?? " "));
          areaDes2Field.setText("  " + (areaDesem[1] ?? " "));
          areaDes3Field.setText("  " + (areaDesem[2] ?? " "));
          localidadField.setText("  " + nombreLocalidad);

          form.flatten();

          // Generar el PDF y guardarlo en un archivo temporal
          const tempFilePath = path.join(
            __dirname,
            "..",
            "files",
            codigoRepa,
            "temp",
            `formulario-${codigoRepa}-REPA.pdf`
          );
          const pdfBytes = await pdfDoc.save();
          fs.writeFileSync(tempFilePath, pdfBytes);

          // Enviar el archivo al cliente
          const file = fs.createReadStream(tempFilePath);
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=formulario-REPA.pdf"
          );
          file.pipe(res);

          // Retornar el archivo temporal
          return tempFilePath;
        } catch (error) {
          console.error("Error al generar el PDF:", error);
          res.status(500).send("Ocurrió un error al generar el PDF");
        }
      };

      doc(req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};
