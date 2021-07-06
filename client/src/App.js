import { useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
//Componentes
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
// Vistas
import Register from "./views/Register";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Notes from "./views/Notes";
//Estilo
import "./App.css";
//Constantes
import { THEMES } from "./constants/themes";
import { MESSAGES } from "./constants/messages";
//Contexto
import Theme from "./contexts/theme";
import User from "./contexts/user";

// Componente principal de la aplicación.
const App = () => {
  const [theme, setTheme] = useState(THEMES.light);

  const localUser = localStorage.ReactUserName;
  const localToken = localStorage.ReactToken;
  const localId = localStorage.ReactUserId;
  
  const [user, setUser] = useState({ username: localUser, token: localToken,id:localId });
 
  //Establecemos el tema
  useEffect(() => {
    if (document.body.classList.value == "") {
      document.body.classList.add(theme);
    } else {
      document.body.classList.replace(
        document.body.classList.value,
        theme
      );
    }
  }, [theme]);

//Establecemos vista según sesión usuario
  useEffect(() => {
    if(!user.token){
      localStorage.removeItem("ReactUserName");
      localStorage.removeItem("ReactUserId");
      localStorage.removeItem("ReactToken");
    }else{
      localStorage.ReactUserName=user.username;
      localStorage.ReactUserId=user.id;
      localStorage.ReactToken=user.token;
    }
  }, [user.token]);

  // Mostramos la aplicación
  return(
  <User.Provider value={{username:user.username,token:user.token, id:user.id,updateUser: setUser }}>
  <Theme.Provider value={{ current: theme, update: setTheme}}>
    <main>
      <Header></Header>
      <h1 id="titulo-app" className="title-app">{MESSAGES.tituloApp}</h1>
        <Router>
          <Switch>
            <PrivateRoute path="/notes">
                <Notes />
            </PrivateRoute>
            <PrivateRoute path="/" exact>
              <Redirect to={{pathname: "/notes"}}/>
            </PrivateRoute>
            <Route path="/login"exact>
              {user.token&& <Redirect to={{pathname: "/notes"}}/>}
              <Login/>
            </Route>
            <Route path="/register" exact>
              {user.token&& <Redirect to={{pathname: "/notes"}}/>}
              <Register />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
      </Router>
  <Footer></Footer>
    </main>
  </Theme.Provider>
  </User.Provider> );
};
export default App;
