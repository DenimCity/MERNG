import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Home, Login, Register } from "./components/pages";
import MenuBar from './components/MenuBar'

function App() {
  return (
   <Router>
    <Container>
       <MenuBar/>
     <Switch>
        <Route exact path='/' component={ Home }/>
        <Route exact path='/login' component={ Login } />
        <Route exact path='/register' component={ Register } />
     </Switch>
    </Container>
   </Router>
  );
}

export default App;
