import User from "../models/Users";
import { isCorrectPassword } from "../models/Users";

export const renderSignUp = async (req, res) => {
  res.render("login");
};

export const signUpUser = async (req, res) => {
  try {
    const user = User(req.body);
    const userSaved = await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const renderSignIn = async (req, res) => {
    res.render("signin");
  };

export const signInUser = (req, res) => {
    try {
      const {user, password} = req.body;
      console.log(User.findOne({user: user}))
      User.findOne({user: user}, (err, user)  =>{
        if(err){
            res.status(500).send('Error al autenticar al usuario')
        }else if(!user){
            res.status(500).send('El usuario no existe')
        }else{
            isCorrectPassword(password, user, (err, result) =>{
                if(err){
                    res.status(500).send('Error al autenticar')
                }else if(result){
                    res.status(200).send('Usuario autenticado')
                }else{
                    res.status(500).send('Usuario o contraseña incorrecta')
                }
            })
        }
      });
      //res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };