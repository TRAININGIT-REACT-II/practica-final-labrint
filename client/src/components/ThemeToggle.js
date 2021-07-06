import { useContext } from "react";
import { THEMES } from "../constants/themes";
import { MESSAGES } from "../constants/messages";
import Theme from "../contexts/theme";
import "./css/ThemeToggle.css";


// Toggle para cambiar el tema actual
const ThemeToggle = () => {
  const theme = useContext(Theme);
  const nextThemeTitle = MESSAGES.cambiarA+ (theme.current === THEMES.light ? MESSAGES.modoOscuro : MESSAGES.modoClaro);

  const onChange = () => {
    if (theme.current === THEMES.light) {
      theme.update(THEMES.dark);
    } else {
      theme.update(THEMES.light);
    }
  };

  return( 
  <div className="theme-toggle-wrap">
      <input id="theme-check" type="checkbox" onChange={onChange}/>
      <label htmlFor="theme-check" title={nextThemeTitle}>
        <span className="theme-toggle material-icons theme-toggle-light" aria-label="Tema claro">&#xe518;</span>
        <span className="theme-toggle material-icons theme-toggle-dark" aria-label="Tema oscuro">&#xf03d;</span>
      </label>
      
  </div>);
};
export default ThemeToggle;