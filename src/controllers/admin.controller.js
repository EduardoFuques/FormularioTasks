import {
  areaDesOpc,
  areaDesUsuarioArr,
  areasCompOpc,
  areasCompUsuarioArr,
  columnasPerFis,
  columnasPerJur,
  domiciliosOpc,
  mediosUsuarioArr,
  mediosopc,
} from "../helpers/arrays";
import { getUsersWithForms, getPJWithForms } from "../helpers/buscador";
import Form from "../models/Formulario";
import User from "../models/Usuarios";
import ExcelJS from "exceljs";
import validator from "validator";

export const renderAdmin = async (req, res) => {
  try {
    // Obtener los datos
    let usersWithForms = await getUsersWithForms();
    let PJWithForms = await getPJWithForms();

    // Añadir una propiedad 'tipoUsuario' para distinguir entre usuarios y personas jurídicas
    usersWithForms = usersWithForms.map(user => ({ ...user, tipoUsuario: 'Usuario' }));
    PJWithForms = PJWithForms.map(pj => ({ ...pj, tipoUsuario: 'Persona Jurídica' }));

    // Combinar ambos conjuntos de datos
    const combinedData = [...usersWithForms, ...PJWithForms];

    // Calcular días desde la última actualización y resultadoUpdated para todos los elementos
    combinedData.forEach((datitos) => {
      const fechaActual = new Date();
      const fechaUpdatedAt = new Date(datitos.fUpdate);
      const fechaCreatedAt = new Date(datitos.fCreacion);

      let diasDesdeUpdated;
      if (fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
        diasDesdeUpdated = 0;
      } else {
        diasDesdeUpdated = Math.round(
          (fechaActual - fechaUpdatedAt) / (1000 * 60 * 60 * 24)
        );
      }

      let resultadoUpdated;
      if (
        diasDesdeUpdated === 0 &&
        fechaUpdatedAt.getTime() !== fechaCreatedAt.getTime()
      ) {
        resultadoUpdated = "Hoy";
      } else if (
        diasDesdeUpdated === 0 &&
        fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()
      ) {
        const diasDesdeCreacion = Math.round(
          (fechaActual - fechaCreatedAt) / (1000 * 60 * 60 * 24)
        );
        resultadoUpdated = `${diasDesdeCreacion} días`;
      } else {
        resultadoUpdated = `${diasDesdeUpdated} días`;
      }

      const fechaCreatedISO = datitos.createdAt ? datitos.createdAt.toISOString() : '';
      const fechaCreated = fechaCreatedISO.slice(0, 10);
      datitos.createdAt = fechaCreated
      datitos.updatedAt = resultadoUpdated;
    });

    // Ordenar por fecha de actualización (fUpdate)
    combinedData.sort((a, b) => (a.fUpdate < b.fUpdate) ? 1 : -1);

    const admin = true;
    res.render("administracion", {
      admin: admin,
      usersWithForms: combinedData,
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};


export const filtroBuscadorAdmin = async (req, res) => {
  const query = req.body.q.toLowerCase();
  const Vquery = validator.escape(query);
  let usersWithForms = await getUsersWithForms();
  usersWithForms.sort((a, b) => (a.codigoRepa > b.codigoRepa) ? 1 : -1);
  const admin = true;
  let filteredUsers = usersWithForms.filter((user) => {
    return (
      user.nombre.toLowerCase().includes(Vquery) ||
      user.apellido.toLowerCase().includes(Vquery) ||
      user.email.toLowerCase().includes(Vquery) ||
      user.usuario.toLowerCase().includes(Vquery) ||
      user.codigoRepa.toLowerCase().includes(Vquery)
    );
  });

  res.render("administracion", { admin: admin, usersWithForms: filteredUsers, criterioDeBusqueda: Vquery});
}

export const adminPJ = async (req, res) => {
  try {
    const usuarios = await User.find(
      { rol: "perJur" },
      "usuario rol codigoRepa"
    ).lean();
    const datitos = await Form.find(
      { usuario: { $in: usuarios.map((u) => u.usuario) } },
      "razonSocial nombreFantasia tipoDoc usuario nombre apellido cuil sexo email sitAfip sitIaavim domicilio telefono createdAt updatedAt dniFileUrl cvFileUrl"
    ).lean();

    const datitosPorUsuario = datitos.reduce((acc, item) => {
      acc[item.usuario] = item;
      return acc;
    }, {});

    const usuariosConDatitos = usuarios.map((usuario) => {
      const datitos = datitosPorUsuario[usuario.usuario] || {
        nombre: "",
        apellido: "",
        tipoDoc: "",
        cuil: "",
        sexo: "",
        email: "",
        sitAfip: "",
        sitIaavim: "",
        razonSocial: "",
        nombreFantasia: "",
        domicilio: [{ calle: "", numero: "", piso: "", depto: "", cp: "" }],
        telefono: [{ fijo: "", movil: "", alternativo: "" }],
      }; // Si no hay datitos, se crea un objeto vacío
      return {
        codigoRepa: usuario.codigoRepa,
        usuario: usuario.usuario,
        rol: usuario.rol,
        nombre: datitos.nombre,
        apellido: datitos.apellido,
        tipoDoc: datitos.tipoDoc,
        cuil: datitos.cuil,
        sexo: datitos.sexo,
        email: datitos.email,
        sitAfip: datitos.sitAfip,
        sitIaavim: datitos.sitIaavim ? "ACTIVO" : "INACTIVO",
        razonSocial: datitos.razonSocial,
        nombreFantasia: datitos.nombreFantasia,
        domicilio: datitos.domicilio && datitos.domicilio[0], // Si hay domicilio, se toma el primer elemento del arreglo
        telefono: datitos.telefono && datitos.telefono[0], // Si hay teléfono, se toma el primer elemento del arreglo
        calle: datitos.domicilio[0].calle,
        numero: datitos.domicilio[0].numero,
        piso: datitos.domicilio[0].piso,
        depto: datitos.domicilio[0].depto,
        cp: datitos.domicilio[0].cp,
        fijo: datitos.telefono[0].fijo,
        movil: datitos.telefono[0].movil,
        movilAlt: datitos.telefono[0].alternativo,
        // Propiedades nuevas
        localidad: "",
        distrito: "",
        departamento: "",
        createdAt: datitos.createdAt,
        updatedAt: datitos.updatedAt,
        dniFileUrl: datitos.dniFileUrl,
        cvFileUrl: datitos.cvFileUrl,
      };
    });

    usuariosConDatitos.forEach((datitos) => {
      for (let i = 0; i < domiciliosOpc.length; i++) {
        const obj = domiciliosOpc[i];
        if (obj.opciones.indice.toString() === datitos.domicilio.localidad) {
          datitos.localidad = obj.localidad;
          datitos.distrito = obj.opciones.Distrito;
          datitos.departamento = obj.opciones.Departamento;
          break;
        }
      }
      const fechaActual = new Date();
      const fechaUpdatedAt = new Date(datitos.updatedAt);
      const fechaCreatedAt = new Date(datitos.createdAt);

      let diasDesdeUpdated;
      if (fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
        diasDesdeUpdated = 0;
      } else {
        diasDesdeUpdated = Math.round(
          (fechaActual - fechaUpdatedAt) / (1000 * 60 * 60 * 24)
        );
      }

      let resultadoUpdated;
      if (
        diasDesdeUpdated === 0 &&
        fechaUpdatedAt.getTime() !== fechaCreatedAt.getTime()
      ) {
        resultadoUpdated = "Hoy";
      } else if (
        diasDesdeUpdated === 0 &&
        fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()
      ) {
        resultadoUpdated = "Nunca";
      } else {
        resultadoUpdated = `${diasDesdeUpdated} días atrás`;
      }
      const fechaCreatedISO = datitos.createdAt ? datitos.createdAt.toISOString() : '';
      const fechaCreated = fechaCreatedISO.slice(0, 10);
      datitos.createdAt = fechaCreated
      datitos.updatedAt = resultadoUpdated
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Personas Jurídicas");

    // Define el encabezado de la tabla
    worksheet.columns = columnasPerJur;

    // Establece el ancho automático de las columnas
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Agrega los datos a la tabla
    usuariosConDatitos.forEach((usuario) => {
      const row = worksheet.addRow(usuario);
      row.eachCell((cell, colNumber) => {
        const column = worksheet.getColumn(colNumber);
        const newWidth = Math.max(
          column.width,
          cell.value.toString().length + 1
        );
        column.width = newWidth;
      });
    });

    // Configura el estilo de la tabla
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // Encabezado
        row.font = { bold: true };
      } else {
        // Datos
        row.alignment = { vertical: "middle", horizontal: "left" };
        row.height = 20;
        row.eachCell((cell, colNumber) => {
          cell.alignment = { wrapText: true };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Establece el tipo de contenido de la respuesta y envía el archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=REPA-PerJur.xlsx"
    );
    await workbook.xlsx.write(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export const adminPF = async (req, res) => {
  try {
    const usuarios = await User.find(
      { rol: "normal" },
      "usuario rol codigoRepa"
    ).lean();
    const datitos = await Form.find(
      { usuario: { $in: usuarios.map((u) => u.usuario) } },
      "apellido nombre tipoDoc usuario cuil sexo sitAfip sitIaavim domicilio telefono email medios areaDes areaComp createdAt updatedAt dniFileUrl cvFileUrl"
    ).lean(); //
    // datitos.forEach((dato) => {
    //   const fechaCreatedISO = dato.createdAt.toISOString();
    //   const fechaCreated = fechaCreatedISO.slice(0, 10);
    //   console.log(fechaCreated);
    // });

    const datitosPorUsuario = datitos.reduce((acc, item) => {
      const domicilio = item.domicilio[0];
      const telefono = item.telefono[0];
      const medios = item.medios;
      const mediosUsuarioArrCopy = Object.assign({}, mediosUsuarioArr);       medios.forEach((medioIndice) => {
        const medioObj = mediosopc.find(
          (obj) => obj.indice === parseInt(medioIndice)
        );
        if (medioObj) {
          mediosUsuarioArrCopy[medioObj.medio] = medioObj.medio;
        }
      });
      const areaDes = item.areaDes;
      const areaDesUsuario = areaDesUsuarioArr;
      areaDes.forEach((areaIndice) => {
        const areaObj = areaDesOpc.find(
          (obj) => obj.indice === parseInt(areaIndice)
        );
        if (areaObj) {
          areaDesUsuario[areaObj.medio] = areaObj.medio;
        }
      });
      const areaComp = item.areaComp;
      const areaCompUsuario = areasCompUsuarioArr;
      areaComp.forEach((areaIndice) => {
        const areaObj = areasCompOpc.find(
          (obj) => obj.indice === parseInt(areaIndice)
        );
        if (areaObj) {
          areaCompUsuario[areaObj.medio] = areaObj.medio;
        }
      });

      const localidad = {
        localidad: "",
        distrito: "",
        departamento: "",
      };

      for (let i = 0; i < domiciliosOpc.length; i++) {
        const obj = domiciliosOpc[i];
        if (obj.opciones.indice.toString() === domicilio.localidad) {
          localidad.localidad = obj.localidad;
          localidad.distrito = obj.opciones.Distrito;
          localidad.departamento = obj.opciones.Departamento;
          break;
        }
      }
      const fechaActual = new Date();
      const fechaUpdatedAt = new Date(item.updatedAt);
      const fechaCreatedAt = new Date(item.createdAt);

      let diasDesdeUpdated;
      if (fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
        diasDesdeUpdated = 0;
      } else {
        diasDesdeUpdated = Math.round(
          (fechaActual - fechaUpdatedAt) / (1000 * 60 * 60 * 24)
        );
      }

      let resultadoUpdated;
      if (
        diasDesdeUpdated === 0 &&
        fechaUpdatedAt.getTime() !== fechaCreatedAt.getTime()
      ) {
        resultadoUpdated = "Hoy";
      } else if (
        diasDesdeUpdated === 0 &&
        fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()
      ) {
        resultadoUpdated = "Nunca";
      } else {
        resultadoUpdated = `${diasDesdeUpdated} días atrás`;
      }

      const fechaCreatedISO = item.createdAt.toISOString();
      const fechaCreated = fechaCreatedISO.slice(0, 10);
      acc[item.usuario] = {
        codigoRepa:
          usuarios.find((u) => u.usuario === item.usuario)?.codigoRepa ?? "",
        tipoDoc: item.tipoDoc || "",
        usuario: item.usuario || "",
        nombre: item.nombre || "",
        apellido: item.apellido || "",
        cuil: item.cuil || "",
        sexo: item.sexo || "",
        email: item.email || "",
        sitAfip: item.sitAfip || "",
        sitIaavim: item.sitIaavim ? "ACTIVO" : "INACTIVO",
        calle: domicilio.calle || "", // agrega el campo calle
        numero: domicilio.numero || "", // agrega el campo numero
        piso: domicilio.piso || "",
        depto: domicilio.depto || "",
        cp: domicilio.cp || "",
        localidad: localidad.localidad || "",
        distrito: localidad.distrito || "",
        departamento: localidad.departamento || "",
        fijo: telefono.fijo || "",
        movil: telefono.movil || "",
        movilAlt: telefono.alternativo || "",
        // medio1: medio1Obj !== undefined ? medio1Obj.medio : "",
        // medio2: medio2Obj !== undefined ? medio2Obj.medio : "",
        // medio3: medio3Obj !== undefined ? medio3Obj.medio : "",
        // areaDes1: areaDes1Obj !== undefined ? areaDes1Obj.medio : "",
        // areaDes2: areaDes2Obj !== undefined ? areaDes2Obj.medio : "",
        // areaDes3: areaDes3Obj !== undefined ? areaDes3Obj.medio : "",
        // areaComp1: areaComp1Obj !== undefined ? areaComp1Obj.medio : "",
        // areaComp2: areaComp2Obj !== undefined ? areaComp2Obj.medio : "",
        // areaComp3: areaComp3Obj !== undefined ? areaComp3Obj.medio : "",
        ...mediosUsuarioArrCopy, // Agregar los valores de mediosUsuario a las columnas correspondientes
        ...areaDesUsuario,
        ...areaCompUsuario,
        createdAt: fechaCreated,
        updatedAt: resultadoUpdated,
        dniFileUrl: item.dniFileUrl,
        cvFileUrl: item.cvFileUrl,
      };
      return acc;
    }, {});
    //console.log(datitosPorUsuario)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Personas Físicas");

    // Define el encabezado de la tabla
    worksheet.columns = columnasPerFis;

    // Establece el ancho automático de las columnas
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Agrega los datos a la tabla
    Object.values(datitosPorUsuario).forEach((usuario) => {
      const row = worksheet.addRow(usuario);
      row.eachCell((cell, colNumber) => {
        const column = worksheet.getColumn(colNumber);
        const newWidth = Math.max(
          column.width,
          cell.value.toString().length + 1
        );
        column.width = newWidth;
      });
    });

    // Configura el estilo de la tabla
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // Encabezado
        row.font = { bold: true };
      } else {
        // Datos
        row.alignment = { vertical: "middle", horizontal: "left" };
        row.height = 20;
        row.eachCell((cell, colNumber) => {
          cell.alignment = { wrapText: true };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Establece el tipo de contenido de la respuesta y envía el archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=REPA-PerFis.xlsx"
    );
    await workbook.xlsx.write(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export const updateAdminiaavim = async (req, res) => {
  try {
    const {
      usuario,
      sitIaavim
    } = req.body;
    const Vusuario = validator.escape(usuario);
    let VsitIaavim;
    if (isBoolean(sitIaavim)) {
      VsitIaavim = sitIaavim;
    } else {
      VsitIaavim = false;
    }
    await Form.updateOne({usuario: Vusuario}, { $set: { sitIaavim: VsitIaavim } })    
  } catch (error) {
    console.log(error.message);
  }
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

export const updateAdminEmail = async (req, res) => {
  try {
    const {usuario, email} = req.body;
    const Vusuario = validator.escape(usuario);
    const isEmailValid=validator.isEmail(email)
    let Vemail
    if (isEmailValid) {
      Vemail=email
    } else {
      req.flash("error_msg", "El correo introducido es inválido")
      return res.redirect(req.headers.referer);
    }
    await User.updateOne({usuario: Vusuario}, { $set: { email: Vemail } })
    await Form.updateOne({usuario: Vusuario}, { $set: { email: Vemail } })    

  } catch (error) {
    console.log(error.message);
  }
}