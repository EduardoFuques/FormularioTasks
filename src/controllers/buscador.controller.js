import { getEmpresasWithForms, getUsersWithForms } from "../helpers/buscador";
import validator from "validator";

export const filtroBuscadorPersonas = async (req, res) => {
  try {
    const query = req.body.q.toLowerCase();
    const Vquery = validator.escape(query);
    let usersWithForms = await getUsersWithForms();

    let filteredUsers = usersWithForms.filter((user) => {
      return (
        user.nombre.toLowerCase().includes(Vquery) ||
        user.apellido.toLowerCase().includes(Vquery) ||
        user.localidad.toLowerCase().includes(Vquery) ||
        user.medios.some((medio) => medio.toLowerCase().includes(Vquery)) ||
        user.areaDes.some((area) => area.toLowerCase().includes(Vquery)) ||
        user.areaComp.some((area) => area.toLowerCase().includes(Vquery))
      );
    });

    res.render("buscadorPersonas", { usersWithForms: filteredUsers, criterioDeBusqueda: Vquery});
  } catch (error) {
    console.error(error);
    res.render("error");
  }
};

export const renderBuscadorPersonas = async (req, res) => {
  try {
    let usersWithForms = await getUsersWithForms();
    res.render("buscadorPersonas", {
      usersWithForms: usersWithForms,
    });
  } catch (error) {
    console.error(error);
    res.render("error");
  }
};

export const renderBuscadorEmpresas = async (req, res) => {
  try {
    let usersWithForms = await getEmpresasWithForms();
    res.render("buscadorEmpresas", {
      usersWithForms: usersWithForms,
    });
  } catch (error) {
    console.error(error);
    res.render("error");
  }
};

export const filtroBuscadorEmpresas = async (req, res) => {
    try {
      const query = req.body.q.toLowerCase();
      const Vquery = validator.escape(query);
      let usersWithForms = await getEmpresasWithForms();
  
      let filteredUsers = usersWithForms.filter((user) => {
        return (
          user.nombre.toLowerCase().includes(Vquery) ||
          user.apellido.toLowerCase().includes(Vquery) ||
          user.localidad.toLowerCase().includes(Vquery) ||
          user.razonSocial.toLowerCase().includes(Vquery) ||
          user.nombreEmpresa.toLowerCase().includes(Vquery) ||
          user.nombreFantasia.toLowerCase().includes(Vquery)
        );
      });
      res.render("buscadorEmpresas", { usersWithForms: filteredUsers, criterioDeBusqueda: Vquery });
    } catch (error) {
      console.error(error);
      res.render("error");
    }
  };