import { getEmpresasWithForms, getUsersWithForms } from "../helpers/buscador";

export const filtroBuscadorPersonas = async (req, res) => {
  try {
    const query = req.body.q.toLowerCase();
    let usersWithForms = await getUsersWithForms();

    let filteredUsers = usersWithForms.filter((user) => {
      return (
        user.nombre.toLowerCase().includes(query) ||
        user.apellido.toLowerCase().includes(query) ||
        user.localidad.toLowerCase().includes(query) ||
        user.medios.some((medio) => medio.toLowerCase().includes(query)) ||
        user.areaDes.some((area) => area.toLowerCase().includes(query)) ||
        user.areaComp.some((area) => area.toLowerCase().includes(query))
      );
    });

    res.render("buscadorPersonas", { usersWithForms: filteredUsers, criterioDeBusqueda: query});
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
      let usersWithForms = await getEmpresasWithForms();
  
      let filteredUsers = usersWithForms.filter((user) => {
        return (
          user.nombre.toLowerCase().includes(query) ||
          user.apellido.toLowerCase().includes(query) ||
          user.localidad.toLowerCase().includes(query) ||
          user.razonSocial.toLowerCase().includes(query) ||
          user.nombreEmpresa.toLowerCase().includes(query) ||
          user.nombreFantasia.toLowerCase().includes(query)
        );
      });
      console.log(query)
      res.render("buscadorEmpresas", { usersWithForms: filteredUsers, criterioDeBusqueda: query });
    } catch (error) {
      console.error(error);
      res.render("error");
    }
  };