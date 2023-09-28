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
        userWithForms.sitIaavim = userWithForms.form[0].sitIaavim;
        userWithForms.cvFileUrl = userWithForms.form[0].cvFileUrl;
        userWithForms.dniFileUrl = userWithForms.form[0].dniFileUrl;
        userWithForms.fCreacion = userWithForms.form[0].createdAt;
        userWithForms.fUpdate = userWithForms.form[0].updatedAt;
        delete userWithForms._id;
        delete userWithForms.tipoDoc;
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
        userWithForms.sitIaavim = userWithForms.form[0].sitIaavim;
        delete userWithForms._id;
        delete userWithForms.tipoDoc;
        delete userWithForms.usuario;
        delete userWithForms.password;
        delete userWithForms.rol;
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

export const getPJWithForms = async () => {
  try {
    const rawPJWithForms = await User.aggregate([
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
        },
      },
    ]);
    // Convierte cada documento en un objeto plano de JavaScript utilizando la función JSON.parse(JSON.stringify())
    const PJWithForms = rawPJWithForms.map((doc) => {
      const PJWithForms = JSON.parse(JSON.stringify(doc));

      // Verifica si el usuario tiene un formulario
      if (PJWithForms.form.length > 0) {
        const localidadIndex = PJWithForms.form[0].domicilio[0].localidad;

        // Verifica si el índice de la localidad es un número
        if (!isNaN(localidadIndex)) {
          PJWithForms.localidad =
            domiciliosOpc[localidadIndex].localidad;
        } 
        PJWithForms.movil = PJWithForms.form[0].telefono[0].movil;
        PJWithForms.sitIaavim = PJWithForms.form[0].sitIaavim;
        PJWithForms.cvFileUrl = PJWithForms.form[0].cvFileUrl;
        PJWithForms.dniFileUrl = PJWithForms.form[0].dniFileUrl;
        PJWithForms.fCreacion = PJWithForms.form[0].createdAt;
        PJWithForms.fUpdate = PJWithForms.form[0].updatedAt;
        delete PJWithForms._id;
        delete PJWithForms.tipoDoc;
        delete PJWithForms.password;
        delete PJWithForms.rol;
        //delete userWithForms.codigoRepa;
        delete PJWithForms.createdAt;
        delete PJWithForms.updatedAt;
        // Concatena nombre y apellido
        PJWithForms.nombre = PJWithForms.form[0].apellido + ' ' + PJWithForms.form[0].nombre;
        PJWithForms.apellido = PJWithForms.form[0].nombreFantasia

      }
      return PJWithForms.form.length > 0 ? PJWithForms : null;

    }).filter(Boolean);

    return PJWithForms;
  } catch (error) {
    console.error(error);
    throw error;
  }
};