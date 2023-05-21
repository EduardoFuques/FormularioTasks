import User from "../models/Usuarios.js";
import { areaDesOpc, areasCompOpc, domiciliosOpc, mediosopc } from "./arrays.js";

export const getUsersWithForms = async () => {
  try {
    const rawUsersWithForms = await User.aggregate([
      {
        $lookup: {
          from: "forms",
          localField: "usuario",
          foreignField: "usuario",
          as: "form",
        },
      },
      {
        $match: {
          rol: "normal",
          sitIaavim: true
        },
      },
    ]);

    // Convierte cada documento en un objeto plano de JavaScript utilizando la función JSON.parse(JSON.stringify())
    const usersWithForms = rawUsersWithForms.map((doc) => {
      const userWithForms = JSON.parse(JSON.stringify(doc));

      // Verifica si el usuario tiene un formulario
      if (userWithForms.form.length > 0) {
        const localidadIndex = userWithForms.form[0].domicilio[0].localidad;

        // Verifica si el índice de la localidad es un número
        if (!isNaN(localidadIndex)) {
          userWithForms.localidad =
            domiciliosOpc[localidadIndex].localidad;
        } 
        userWithForms.movil = userWithForms.form[0].telefono[0].movil;
        userWithForms.medios = userWithForms.form[0].medios;
        userWithForms.areaDes = userWithForms.form[0].areaDes;
        userWithForms.areaComp = userWithForms.form[0].areaComp;
        delete userWithForms._id;
        delete userWithForms.tipoDoc;
        delete userWithForms.usuario;
        delete userWithForms.password;
        delete userWithForms.rol;
        //delete userWithForms.codigoRepa;
        delete userWithForms.createdAt;
        delete userWithForms.updatedAt;
      }
      // Reemplaza los índices de medios con los valores correspondientes de mediosopc
      if (userWithForms.medios && userWithForms.medios.length > 0) {
        const mediosStrings = userWithForms.medios.map(
          (indice) => mediosopc[indice].medio
        );
        userWithForms.medios = mediosStrings;
      }
      if (userWithForms.areaDes && userWithForms.areaDes.length > 0) {
        const mediosStrings = userWithForms.areaDes.map(
          (indice) => areaDesOpc[indice].medio
        );
        userWithForms.areaDes = mediosStrings;
      }
      if (userWithForms.areaComp && userWithForms.areaComp.length > 0) {
        const mediosStrings = userWithForms.areaComp.map(
          (indice) => areasCompOpc[indice].medio
        );
        userWithForms.areaComp = mediosStrings;
      }

      return userWithForms.form.length > 0 ? userWithForms : null;
    }).filter(Boolean);

    return usersWithForms;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEmpresasWithForms = async () => {
  try {
    const rawUsersWithForms = await User.aggregate([
      {
        $lookup: {
          from: "forms",
          localField: "usuario",
          foreignField: "usuario",
          as: "form",
        },
      },
      {
        $match: {
          rol: "perJur",
          sitIaavim: true
        },
      },
    ]);

    // Convierte cada documento en un objeto plano de JavaScript utilizando la función JSON.parse(JSON.stringify())
    const usersWithForms = rawUsersWithForms.map((doc) => {
      const userWithForms = JSON.parse(JSON.stringify(doc));

      // Verifica si el usuario tiene un formulario
      if (userWithForms.form.length > 0) {
        const localidadIndex = userWithForms.form[0].domicilio[0].localidad;

        // Verifica si el índice de la localidad es un número
        if (!isNaN(localidadIndex)) {
          userWithForms.localidad =
            domiciliosOpc[localidadIndex].localidad;
        } 
        userWithForms.movil = userWithForms.form[0].telefono[0].movil;
        userWithForms.razonSocial = userWithForms.form[0].razonSocial;
        userWithForms.nombreFantasia = userWithForms.form[0].nombreFantasia;
        userWithForms.nombreEmpresa = userWithForms.form[0].nombreEmpresa;
        delete userWithForms._id;
        delete userWithForms.tipoDoc;
        delete userWithForms.usuario;
        delete userWithForms.password;
        delete userWithForms.rol;
        delete userWithForms.codigoRepa;
        delete userWithForms.createdAt;
        delete userWithForms.updatedAt;
      }
      // Reemplaza los índices de medios con los valores correspondientes de mediosopc

      return userWithForms.form.length > 0 ? userWithForms : null;
    }).filter(Boolean);

    return usersWithForms;
  } catch (error) {
    console.error(error);
    throw error;
  }
};