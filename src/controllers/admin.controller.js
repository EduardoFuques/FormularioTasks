import {
  areaDesOpc,
  areasCompOpc,
  columnasPerFis,
  domiciliosOpc,
  mediosopc,
} from "../helpers/arrays";
import Form from "../models/Formulario";
import User from "../models/Usuarios";
import XlsxPopulate from "xlsx-populate";
import ExcelJS from "exceljs";
import { headers } from "../helpers/arrays";
import XLSX from "xlsx";

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

  res.render("administracion", { usuariosConDatitos });
};

export const adminPF = async (req, res) => {
  const usuarios = await User.find(
    { rol: "normal" },
    "usuario rol codigoRepa"
  ).lean();
  const datitos = await Form.find(
    { usuario: { $in: usuarios.map((u) => u.usuario) } },
    "tipoDoc usuario nombre apellido cuil sexo email sitAfip sitIaavim domicilio telefono medios areaDes areaComp"
  ).lean(); //

  const datitosPorUsuario = datitos.reduce((acc, item) => {
    acc[item.usuario] = item;
    return acc;
  }, {});

  const usuariosConDatitos = usuarios.map((usuario) => {
    const datitos = datitosPorUsuario[usuario.usuario] || {}; // Si no hay datitos, se crea un objeto vacío
    const medios = [];
    for (let i = 0; i < datitos.medios.length; i++) {
      const indice = parseInt(datitos.medios[i], 10); // Convertir a número entero
      medios.push(mediosopc[indice].medio);
    }
    const areaDes = [];
    for (let i = 0; i < datitos.areaDes.length; i++) {
      const indice = parseInt(datitos.areaDes[i], 10); // Convertir a número entero
      areaDes.push(areaDesOpc[indice].medio);
    }
    const areaComp = [];
    for (let i = 0; i < datitos.areaComp.length; i++) {
      const indice = parseInt(datitos.areaComp[i], 10); // Convertir a número entero
      areaComp.push(areasCompOpc[indice].medio);
    }

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
      domicilio: datitos.domicilio && datitos.domicilio[0], // Si hay domicilio, se toma el primer elemento del arreglo
      telefono: datitos.telefono && datitos.telefono[0], // Si hay teléfono, se toma el primer elemento del arreglo

      // Propiedades nuevas
      localidad: "",
      distrito: "",
      departamento: "",
      medios: medios.join("\n"),
      areaDes: areaDes.join("\n"),
      areaComp: areaComp.join("\n"),
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

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Personas Físicas");

  // Define el encabezado de la tabla
  worksheet.columns = columnasPerFis;

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
  res.setHeader("Content-Disposition", "attachment; filename=usuarios.xlsx");
  await workbook.xlsx.write(res);
};
