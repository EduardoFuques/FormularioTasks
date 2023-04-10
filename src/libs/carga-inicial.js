import ExcelJS from "exceljs";
import { signUpUser } from "../controllers/user.controller";
import User from "../models/Usuarios";

export const cargaInicial = async (req, res) => {
  try {
    // Crear un nuevo libro de Excel y leer la primera hoja
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("cargainicial.xlsx");
    const worksheet = workbook.getWorksheet(1);

    // Iterar sobre cada fila del archivo Excel y llamar a signUpUser
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
      if (rowNumber !== 1) {
        // Saltar la primera fila si es un encabezado
        const [
          primero,
          opcion,
          nombre,
          apellido,
          usuario,
          email,
          opcionPerJur,
        ] = row.values;
    
        try {
          const existingUser = await User.findOne({ usuario: usuario });
          if (existingUser) {
            console.log(`El usuario ${usuario} ya existe en la base de datos`);
            return;
          }
    
          await signUpUser({
            body: {
              opcion: opcion,
              nombre: nombre,
              apellido: apellido,
              usuario: usuario,
              email: email,
              password: usuario.toString(),
              opcionPerJur: opcionPerJur,
              confirm_password: usuario.toString(),
            },
          });
          console.log(`El usuario ${usuario} fue registrado`)
        } catch (error) {
          console.log(`Error al procesar el usuario ${usuario}: ${error.message}`);
        }
      }
    });
    
  } catch (error) {
    console.log(error.message);
  }
};
