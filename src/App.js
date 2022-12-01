import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import { withAuth0 } from '@auth0/auth0-react';
import Generate from './components/Generate.js';
// import Hamburger from './components/Hamburger.js';
import Edit from './components/Edit.js';
import About from './components/About.js';

class App extends React.Component {
  render() {
    return (
      <>
          <Router>
            <Routes>
              <Route
                exact path="/"
                element= {<Generate />}
              >
              </Route>
              <Route
                exact path="/about"
                element={<About />}>
              </Route>
              <Route
                exact path="/edit"
                element={<Edit />}>
              </Route>
            </Routes>
      </Router>
      </>
    )
  }
}

// export default withAuth0(App);
export default App;
