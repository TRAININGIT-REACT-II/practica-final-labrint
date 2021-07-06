import { useRouteMatch} from "react-router";
import { BrowserRouter as Router, Route,Link} from "react-router-dom";
import AddNote from "../components/AddNote";
import Posit from "../components/Posit";
import ShowNote from "../components/ShowNote";
import EditNote from "../components/EditNote";
import NotesList from "../components/NotesList";
import ErrorBoundary from "../components/ErrorBoundary";
import { MESSAGES } from "../constants/messages";
import { Provider } from "react-redux";

// Store
import store from "../store";

const Notes = () => {
  const match = useRouteMatch();


return (
  <Provider store={store}>
      <section className= "wrap-notes">
        <Router>
            <ErrorBoundary message={MESSAGES.errorInesperado}>
              <Route path={`${match.url}/get/:id`} exact>
                  <ShowNote />
              </Route>
              <Route path={`${match.url}/edit/:id`} exact>
                  <EditNote/>
              </Route>
              <Route path={`${match.url}/add`} exact>
                  <AddNote/>
              </Route>
              </ErrorBoundary>
              <ErrorBoundary message={MESSAGES.errorInesperado}>
              <Route path={`${match.url}`} exact>
                    <Posit titulo={MESSAGES.misNotas}/>
                    <div className="ali-right"><Link to={`${match.url}/add`} id="link-create" className="button">{MESSAGES.add}</Link></div>
              </Route>
              </ErrorBoundary>
              <ErrorBoundary message={MESSAGES.errorInesperado}>
            <Route path={`${match.url}`}>
                <NotesList/>
            </Route>
            </ErrorBoundary>
      </Router>
      </section>
      </Provider>
  );
};

export default Notes;
