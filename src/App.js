import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FetchingHack from './components/FetchingHack';
import Accelerometer from './components/Accelerometer';
import Correct from './components/Correct';
import InCorrect from './components/InCorrect'; 
import FetchingProper from './components/FetchingProper'; 
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

class GoodFetch extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <h3>Just a simple fetch but done using hooks. Should use this for my stuff</h3>
          <FetchingProper location="Europe/Berlin" />
        </Card.Body>
      </Card>
    );
  }
}

class TempPlay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playSound:""
    }
  }  
  handleClickCorrect() {
    this.setState({playSound:"Correct"});
  }

  handleClickInCorrect() {
    this.setState({playSound:"InCorrect"});
  }
  playMySound(){
    switch (this.state.playSound) {
      case "Correct":
        return (<Correct />);
      case "InCorrect":
        return (<InCorrect />);
      default:
        return "";
    }  
  }

  playBuzzy() {
    window.navigator.vibrate([200, 100, 200]);
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <p><Button onClick={() => this.playBuzzy()}>Play Buzzy</Button></p>
          <p><Button onClick={() => this.handleClickCorrect()}>Correct</Button></p>
          <p><Button variant="danger" onClick={() => this.handleClickInCorrect()}>In Correct</Button></p>
        </Card.Body>
        {this.playMySound()}
      </Card>
    );
  }
}

class Home extends React.Component {

  handleRequestOrientationButton() {
    console.log('Handling test');
    if (window.DeviceOrientationEvent) {
      console.log('We have device orientation.');
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            //Doing this in sepearte components
            //window.addEventListener('deviceorientation', (e) => {})
          }
        })
      } else {
        // non iOS 13+
      }
    }
  }

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
          {" "}
          <Link to={`/good-fetch`}><Button variant="primary">Fetching stuff well</Button></Link>
          {" "}
          <Button onClick={() => this.handleRequestOrientationButton()} variant="dark">Orientation</Button>
        </Card.Body>
      </Card>
    );
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

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
            <Route path={`/good-fetch`}>
              <GoodFetch />
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
