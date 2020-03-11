import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FetchingHack from './components/FetchingHack';
import './App.css';


/**
 * 
 * ==== Rebuilding this app from scratch ====
 * npx create-react-app <app-name>
 * npm install react-bootstrap bootstrap
 * npm install react-bootstrap-icons --save
 * npm install react-router-dom
 * 
 */

class TempPlay extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          Whatever! A general space to practise
        </Card.Body>
      </Card>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Basic Home Page</Card.Title>
          <Card.Img variant="top" src='https://i.pinimg.com/236x/5c/2b/d9/5c2bd965c4d91122de012e636496e60c--swimming-photography-summer-photography.jpg' style={{ width: '18rem' }} />
          <p>
            <br />
            A game of guessing fun for all the family and your crazy friends.
          </p>
          <Link to={`${process.env.PUBLIC_URL}/temp-play`}><Button variant="primary">Play time</Button></Link>
          {" "}
          <Link to={`${process.env.PUBLIC_URL}/fetching`}><Button variant="primary">Fetching stuff</Button></Link>
        </Card.Body>
      </Card>
    );
  }
}

class App extends React.Component{
  render() {
    return (
      <Router basename={'/learn'}>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Learning!</Navbar.Brand>
            <NavDropdown title="Options" id="basic-nav-dropdown" className="nav-item dropdown ml-auto">
              <NavDropdown.Item as={Link} to={`${process.env.PUBLIC_URL}/`}>Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`${process.env.PUBLIC_URL}/temp-play`}>Play time</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`${process.env.PUBLIC_URL}/fetching`}>Fetching</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/fetching`}>
              <FetchingHack />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/temp-play`}>
              <TempPlay />
            </Route>                       
            <Route path={`${process.env.PUBLIC_URL}/`}>
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
