import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FetchingHack from './components/FetchingHack';
import Correct from './components/Correct';
import InCorrect from './components/InCorrect';
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

  render() {
    return (
      <Card>
        <Card.Body>
          <Button onClick={() => this.handleClickCorrect()}>Correct</Button>
          <Button variant="danger" onClick={() => this.handleClickInCorrect()}>In Correct</Button>
        </Card.Body>
        {this.playMySound()}
      </Card>
    );
  }
}

class Accelerometer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      soundPlay:"",
      soundLastPlayed:new Date(),
      soundTimeDiff:2000,
      soundDegreeVar:20,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      acc_x:0,
      acc_y:0,
      acc_z:0,
      gyr_x:0,
      gyr_y:0,
      gyr_z:0,            
      windowWith: window.innerWidth
    }
  }
  componentDidMount(){
    window.addEventListener("devicemotion", this.handleMotion);
    window.addEventListener("deviceorientation", this.handleOrientation);
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount(){
    window.removeEventListener("devicemotion", this.handleMotion);
    window.removeEventListener('deviceorientation', this.handleOrientation);
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize = (event) => {
    this.setState({ windowWith: window.innerWidth });
  }
  
  approx(val) {
    return val.toFixed(2);
  }

  checkPlay(){
    if ((new Date() - this.state.soundLastPlayed)>this.state.soundTimeDiff){
      //Its been soundTimeDiff/1000 seconds since tune was played
      if ((Math.abs(this.state.ori_y) > (180-this.state.soundDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.soundDegreeVar)))){
          //When phone sideways, y is near 180, z is near 0 - phone tilted forward
          this.setState({soundPlay:"correct", soundLastPlayed:new Date()})
      }
      if ((Math.abs(this.state.ori_y) < (0+this.state.soundDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.soundDegreeVar)))){
        //When phone sideways, y is near 0, z is near 0
        this.setState({soundPlay:"InCorrect", soundLastPlayed:new Date()})
    }      
    }
  }

  handleOrientation = (event) => {
    this.setState({
      ori_x:this.approx(event.alpha),
      ori_y:this.approx(event.beta),
      ori_z:this.approx(event.gamma)
    });
    this.checkPlay();
  } 
  
  handleMotion = (event) => {
    this.setState({
      gyr_z:this.approx(event.rotationRate.alpha),
      gyr_x:this.approx(event.rotationRate.beta),
      gyr_y:this.approx(event.rotationRate.gamma),
      acc_x:this.approx(event.acceleration.x),
      acc_y:this.approx(event.acceleration.y),
      acc_z:this.approx(event.acceleration.z)
    });
    //this.checkPlay();
  } 

  playSound(){
    switch (this.state.soundPlay) {
      case "Correct":
        return (<Correct />);
      case "InCorrect":
        return (<InCorrect />);
      default:
        return "";
    }  
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <ListGroup>
              <ListGroup.Item>Window width<span className="float-right">{this.state.windowWith}</span></ListGroup.Item>
              <ListGroup.Item>Orientation X<span className="float-right">{this.state.ori_x}</span></ListGroup.Item>
              <ListGroup.Item>Orientation Y<span className="float-right">{this.state.ori_y}</span></ListGroup.Item>
              <ListGroup.Item>Orientation Z<span className="float-right">{this.state.ori_z}</span></ListGroup.Item>
              <ListGroup.Item>Gyro X<span className="float-right">{this.state.gyr_x}</span></ListGroup.Item>
              <ListGroup.Item>Gyro Y<span className="float-right">{this.state.gyr_y}</span></ListGroup.Item>
              <ListGroup.Item>Gyro Z<span className="float-right">{this.state.gyr_z}</span></ListGroup.Item>
              <ListGroup.Item>Acceleration X<span className="float-right">{this.state.acc_x}</span></ListGroup.Item>
              <ListGroup.Item>Acceleration Y<span className="float-right">{this.state.acc_y}</span></ListGroup.Item>
              <ListGroup.Item>Acceleration Z<span className="float-right">{this.state.acc_z}</span></ListGroup.Item>
            </ListGroup>
        </Card.Body>
        {this.playSound()}
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
