import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup';
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
        
        </Card.Body>
      </Card>
    );
  }
}

class Accelerometer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      acc_x:0,
      acc_y:0,
      acc_z:0,
      windowWith: window.innerWidth
    }
  }
  componentDidMount(){
    window.addEventListener('devicemotion', this.handleMotion);
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount(){
    window.removeEventListener('devicemotion', this.handleMotion);
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize = (event) => {
    this.setState({ windowWith: window.innerWidth });
    document.getElementById("updatemeplease").innerHTML = window.innerWidth;
  }
  
  handleMotion = (event) => {
    document.getElementById("arewethere").innerHTML = "Here";
    this.setState({
      acc_x:event.acceleration.x,
      acc_y:event.acceleration.y,
      acc_z:event.acceleration.z
    })
  } 
  
  render() {
    return (
      <Card>
        <Card.Body>
          <ListGroup>
              <ListGroup.Item>Window width (no react)<span className="float-right"><span id="updatemeplease">{this.state.windowWith}</span></span></ListGroup.Item>
              <ListGroup.Item>Window width<span className="float-right">{this.state.windowWith}</span></ListGroup.Item>
              <ListGroup.Item>X<span id="acc_x" className="float-right">{this.state.acc_x}</span></ListGroup.Item>
              <ListGroup.Item>Y<span className="float-right">{this.state.acc_y}</span></ListGroup.Item>
              <ListGroup.Item>Z<span className="float-right">{this.state.acc_z}</span></ListGroup.Item>
              <ListGroup.Item>Triggering<span className="float-right"><span id="arewethere"></span></span></ListGroup.Item>
            </ListGroup>
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
          <Card.Img variant="top" src='https://i.pinimg.com/236x/5c/2b/d9/5c2bd965c4d91122de012e636496e60c--swimming-photography-summer-photography.jpg' style={{ width: '15rem' }} />
          <p>
            <br />
            Just some fun for training
            <br />
            Environment is: <b>{process.env.REACT_APP_ENVIRONEMNT_NAME}</b>
          </p>
          <Link to={`/temp-play`}><Button variant="primary">Play time</Button></Link>
          {" "}
          <Link to={`/fetching`}><Button variant="primary">Fetching stuff</Button></Link>
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
              <NavDropdown.Item as={Link} to={`/`}>Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/temp-play`}>Play time</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/fetching`}>Fetching</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/accelerometer`}>Accelerometer</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path={`/fetching`}>
              <FetchingHack />
            </Route>
            <Route path={`/temp-play`}>
              <TempPlay />
            </Route>
            <Route path={`/accelerometer`}>
              <Accelerometer />
            </Route>            
            <Route path={`/`}>
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
