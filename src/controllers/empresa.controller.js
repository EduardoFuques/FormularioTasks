import Form from "../models/Formulario";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import {
  domiciliosOpc,
} from "../helpers/arrays";

export const renderFormem = async (req, res) => {
  try {
    const userID = req.session.passport.user;
    const { tipoDoc, usuario, nombre, apellido, email, codigoRepa, nombreEmpresa } = req.user;
    const usuarioEncontrado = await Form.findOne({ usuario }).lean();
    if (!usuarioEncontrado) {
      const datos = {
        userID,
        tipoDoc,
        usuario,
        nombre,
        apellido,
        email,
        nombreEmpresa,
      };
      const nombreEmpresa2 = datos.nombreEmpresa.toString();
      const editar = false;
      const perJur = true;
      res.render("indexEmpresa", {
        datos: datos,
        codigoRepa: codigoRepa,
        editar: editar,
        perJur: perJur,
        nombreEmpresa: nombreEmpresa2,
      });
    } else {
      const datos = usuarioEncontrado;
      const editar = true;
      const perJur = true;
      const nombreEmpresa = datos.nombreEmpresa.toString();
      const calle = datos.domicilio[0].calle.toString();
      res.render("editEmpresa", {
        datos: datos,
        nombreEmpresa: nombreEmpresa,
        codigoRepa: codigoRepa,
        domicilio: datos.domicilio[0],
        calle: calle,
        telefono: datos.telefono[0],
        editar: editar,
        perJur: perJur,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const captureFormEm = async (req, res) => {
  try {
    const {
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
      apellido,
      nombre,
    } = req.body;
    const { tipoDoc, usuario, nombreEmpresa, email } = req.user;

    const newForm = new Form({
      tipoDoc,
      usuario,
      nombre,
      apellido,
      email,
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
      nombreEmpresa,
    });
    await newForm.save();
    res.render("pantalla-ok", {perJur: true});
  } catch (error) {
    console.log(error.message);
  }
};

export const captureEditFormEm = async (req, res) => {
  try {
    const {
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
      nombre,
      apellido,
    } = req.body;
    const { tipoDoc, usuario, email, codigoRepa, nombreEmpresa } = req.user;
    const editForm = {
      sexo, //ok
      nombre,
      apellido,
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
        res.render("pantalla-ok", {perJur: true});
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const renderPDFEm = async (req, res) => {
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
      const resLegal = datos.apellido + ", " + datos.nombre
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
          const pdfData = fs.readFileSync("PDF_PJ_FORM.pdf");
          const pdfDoc = await PDFDocument.load(pdfData);
          const form = pdfDoc.getForm();
          const codRepaField = form.getField("codRepa");
          const nomEmprField = form.getField("nomEmpr");
          const razSociField = form.getField("razSoci");
          const cuitField = form.getField("cuit");
          const resLegalField = form.getField("resLegal");
          const tipoDocField = form.getField("tipoDoc");
          const numDocField = form.getField("numDoc");
          const emailField = form.getField("email");
          const sexoField = form.getField("sexo");
          const sitAfipField = form.getField("sitAfip");
          const fijoField = form.getField("fijo");
          const movilField = form.getField("movil");
          const movilAltField = form.getField("movilAlt");
          const localidadField = form.getField("localidad");
          const distritoField = form.getField("distrito");
          const departamentoField = form.getField("departamento");
          const cpField = form.getField("cp");
          const calleField = form.getField("calle");
          const numeroField = form.getField("numero");
          const pisoField = form.getField("piso");
          const deptoField = form.getField("depto");
          const nomFantasField = form.getField("nomFantas");

          codRepaField.setText(codigoRepa.toString());
          nomEmprField.setText("  " + datos.nombreEmpresa);
          razSociField.setText("  " + datos.razonSocial.toString());
          cuitField.setText("  " + datos.usuario.toString());
          resLegalField.setText("  " + resLegal)
          tipoDocField.setText("  " + datos.tipoDoc.toString());
          numDocField.setText("  " + datos.usuario.toString());
          emailField.setText("  " + datos.email.toString());
          sexoField.setText("  " + datos.sexo.toString());
          sitAfipField.setText("  " + datos.sitAfip.toString());
          fijoField.setText("  " + telefono.fijo.toString());
          movilField.setText("  " + telefono.movil.toString());
          movilAltField.setText("  " + telefono.alternativo.toString());
          localidadField.setText("  " + nombreLocalidad);
          distritoField.setText("  " + localidadOpc.opciones.Distrito);
          departamentoField.setText("  " + localidadOpc.opciones.Departamento);
          cpField.setText("  " + domicilio.cp.toString());
          calleField.setText("  " + calle.toString());
          numeroField.setText("  " + domicilio.numero.toString());
          pisoField.setText("  " + domicilio.piso.toString());
          deptoField.setText("  " + domicilio.depto.toString());
          nomFantasField.setText("  " + datos.nombreFantasia.toString())
          

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
