import Form from "../models/Formulario";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import {
  domiciliosOpc,
} from "../helpers/arrays";
import { format } from "date-fns";
import validator from "validator";

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
      const formattedDNIDate = format(datos.dniFileDate, 'dd/MM/yyyy');
      const formattedCVDate = format(datos.cvFileDate, 'dd/MM/yyyy')
      res.render("editEmpresa", {
        datos: datos,
        nombreEmpresa: nombreEmpresa,
        codigoRepa: codigoRepa,
        domicilio: datos.domicilio[0],
        calle: calle,
        telefono: datos.telefono[0],
        editar: editar,
        perJur: perJur,
        formattedDNIDate: formattedDNIDate,
        formattedCVDate: formattedCVDate
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
    const VrazonSocial = validator.escape(razonSocial);
    const VnombreFantasia = validator.escape(nombreFantasia);
    const Vapellido = validator.escape(apellido);
    const Vnombre = validator.escape(nombre);
    const VtipoDoc = validator.escape(tipoDoc);
    const Vusuario = validator.escape(usuario);
    const VnombreEmpresa = validator.escape(nombreEmpresa);
    const isEmailValid=validator.isEmail(email)
    let Vemail;
    let errorMessage="";
    if (isEmailValid) {
      Vemail = email;
    } else {
      errorMessage="Ha ocurrido un error. Póngase en contacto con administración"
      req.flash("error", errorMessage);
      return res.redirect("/logout");
    }
    const cvFileUrl = `${encodeURIComponent(
      req.protocol
    )}://${encodeURIComponent(req.get("host"))}/files/${encodeURIComponent(
      req.user.codigoRepa
    )}/${encodeURIComponent(req.files.estatutoFile[0].filename)}`;
    const dniFileUrl = `${encodeURIComponent(
      req.protocol
    )}://${encodeURIComponent(req.get("host"))}/files/${encodeURIComponent(
      req.user.codigoRepa
    )}/${encodeURIComponent(req.files.dniFile[0].filename)}`;

    const cvFilename = encodeURIComponent(req.files.estatutoFile[0].filename);
    const cvFileDate = cvFilename.substring(cvFilename.lastIndexOf("-") + 1, cvFilename.lastIndexOf("."));
    const cvFileDateISO = cvFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:00Z');

    const dniFilename = encodeURIComponent(req.files.dniFile[0].filename);
    const dniFileDate = dniFilename.substring(dniFilename.lastIndexOf("-") + 1, dniFilename.lastIndexOf("."));
    const dniFileDateISO = dniFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:00Z');
    
    const newForm = new Form({
      tipoDoc: VtipoDoc,
      usuario: Vusuario,
      nombre: Vnombre,
      apellido: Vapellido,
      email: Vemail,
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
      razonSocial: VrazonSocial,
      nombreFantasia: VnombreFantasia,
      nombreEmpresa: VnombreEmpresa,
      cvFileUrl,
      cvFileDate: new Date(cvFileDateISO),
      dniFileUrl,
      dniFileDate: new Date(dniFileDateISO)
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
      nombres,
      apellido,
    } = req.body;
    const { usuario } = req.user;
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
    const VrazonSocial = validator.escape(razonSocial);
    const VnombreFantasia = validator.escape(nombreFantasia);
    const Vapellido = validator.escape(apellido);
    const Vnombre = validator.escape(nombres);
    const Vusuario = validator.escape(usuario);
    const usuarioEncontrado = await Form.findOne({ Vusuario }).lean();
    let cvFileUrl;
    let cvFilename;
    let cvFileDate;
    let cvFileDateISO;
    if (req.files.estatutoFile && req.files.estatutoFile.length > 0 && req.files.estatutoFile[0].filename) {
      cvFileUrl = `${encodeURIComponent(
        req.protocol
      )}://${encodeURIComponent(req.get("host"))}/files/${encodeURIComponent(
        req.user.codigoRepa
      )}/${encodeURIComponent(req.files.estatutoFile[0].filename)}`;
      dniFileUrl = `${encodeURIComponent(
        req.protocol
      )}://${encodeURIComponent(req.get("host"))}/files/${encodeURIComponent(
        req.user.codigoRepa
      )}/${encodeURIComponent(req.files.dniFile[0].filename)}`;
  
      cvFilename = encodeURIComponent(req.files.estatutoFile[0].filename);
      cvFileDate = cvFilename.substring(cvFilename.lastIndexOf("-") + 1, cvFilename.lastIndexOf("."));
      cvFileDateISO = cvFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:00Z');
  
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
      )}/files/${encodeURIComponent(req.user.codigoRepa)}/${encodeURIComponent(
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
      sexo: Vsexo, //ok
      nombre: Vnombre,
      apellido: Vapellido,
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
      razonSocial: VrazonSocial,
      nombreFantasia: VnombreFantasia,
      cvFileUrl,
      cvFileDate: cvFileDateISO,
      dniFileUrl,
      dniFileDate: dniFileDateISO
    };
    await Form.updateOne({ usuario: Vusuario }, { $set: editForm }, (error) => {
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
