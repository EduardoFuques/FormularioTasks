import {
  areaDesOpc,
  areasCompOpc,
  columnasPerFis,
  columnasPerJur,
  domiciliosOpc,
  mediosopc,
} from "../helpers/arrays";
import Form from "../models/Formulario";
import User from "../models/Usuarios";
import ExcelJS from "exceljs";

export const renderAdmin = async (req, res) => {
  res.render("administracion");
};

export const adminPJ = async (req, res) => {
  const usuarios = await User.find(
    { rol: "perJur" },
    "usuario rol codigoRepa"
  ).lean();
  const datitos = await Form.find(
    { usuario: { $in: usuarios.map((u) => u.usuario) } },
    "razonSocial nombreFantasia tipoDoc usuario nombre apellido cuil sexo email sitAfip sitIaavim domicilio telefono"
  ).lean();

  const datitosPorUsuario = datitos.reduce((acc, item) => {
    acc[item.usuario] = item;
    return acc;
  }, {});

  const usuariosConDatitos = usuarios.map((usuario) => {
    const datitos = datitosPorUsuario[usuario.usuario] || {}; // Si no hay datitos, se crea un objeto vacío

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
  });

  console.log(usuariosConDatitos);
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
      const newWidth = Math.max(column.width, cell.value.toString().length + 1);
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
  res.setHeader("Content-Disposition", "attachment; filename=REPA-PerJur.xlsx");
  await workbook.xlsx.write(res);


};

export const adminPF = async (req, res) => {
  const usuarios = await User.find(
    { rol: "normal" },
    "usuario rol codigoRepa"
  ).lean();
  const datitos = await Form.find(
    { usuario: { $in: usuarios.map((u) => u.usuario) } },
    "apellido nombre tipoDoc usuario cuil sexo sitAfip sitIaavim domicilio telefono email medios areaDes areaComp"
  ).lean(); //

  const datitosPorUsuario = datitos.reduce((acc, item) => {
    const domicilio = item.domicilio[0];
    const telefono = item.telefono[0];
    const medios = item.medios;
    const medio1Obj = mediosopc.find(
      (obj) => obj.indice === parseInt(medios[0])
    );
    const medio2Obj = mediosopc.find(
      (obj) => obj.indice === parseInt(medios[1])
    );
    const medio3Obj = mediosopc.find(
      (obj) => obj.indice === parseInt(medios[2])
    );
    const areaComp = item.areaComp;
    const areaComp1Obj = areasCompOpc.find(
      (obj) => obj.indice === parseInt(areaComp[0])
    );
    const areaComp2Obj = areasCompOpc.find(
      (obj) => obj.indice === parseInt(areaComp[1])
    );
    const areaComp3Obj = areasCompOpc.find(
      (obj) => obj.indice === parseInt(areaComp[2])
    );
    const areaDes = item.areaDes;
    const areaDes1Obj = areaDesOpc.find(
      (obj) => obj.indice === parseInt(areaDes[0])
    );
    const areaDes2Obj = areaDesOpc.find(
      (obj) => obj.indice === parseInt(areaDes[1])
    );
    const areaDes3Obj = areaDesOpc.find(
      (obj) => obj.indice === parseInt(areaDes[2])
    );

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

    acc[item.usuario] = {
      codigoRepa:
        usuarios.find((u) => u.usuario === item.usuario)?.codigoRepa ?? "",
      tipoDoc: item.tipoDoc,
      usuario: item.usuario,
      nombre: item.nombre,
      apellido: item.apellido,
      cuil: item.cuil,
      sexo: item.sexo,
      email: item.email,
      sitAfip: item.sitAfip,
      sitIaavim: item.sitIaavim ? "ACTIVO" : "INACTIVO",
      calle: domicilio.calle, // agrega el campo calle
      numero: domicilio.numero, // agrega el campo numero
      piso: domicilio.piso,
      depto: domicilio.depto,
      cp: domicilio.cp,
      localidad: localidad.localidad,
      distrito: localidad.distrito,
      departamento: localidad.departamento,
      fijo: telefono.fijo,
      movil: telefono.movil,
      movilAlt: telefono.alternativo,
      medio1: medio1Obj !== undefined ? medio1Obj.medio : "",
      medio2: medio2Obj !== undefined ? medio2Obj.medio : "",
      medio3: medio3Obj !== undefined ? medio3Obj.medio : "",
      areaDes1: areaDes1Obj !== undefined ? areaDes1Obj.medio : "",
      areaDes2: areaDes2Obj !== undefined ? areaDes2Obj.medio : "",
      areaDes3: areaDes3Obj !== undefined ? areaDes3Obj.medio : "",
      areaComp1: areaComp1Obj !== undefined ? areaComp1Obj.medio : "",
      areaComp2: areaComp2Obj !== undefined ? areaComp2Obj.medio : "",
      areaComp3: areaComp3Obj !== undefined ? areaComp3Obj.medio : "",
    };
    return acc;
  }, {});

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
      const newWidth = Math.max(column.width, cell.value.toString().length + 1);
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
  res.setHeader("Content-Disposition", "attachment; filename=REPA-PerFis.xlsx");
  await workbook.xlsx.write(res);
};
