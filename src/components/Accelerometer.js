import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import correctSound from '../media/correct.wav'
import incorrectSound from '../media/incorrect.wav'

class Accelerometer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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

  audio_correct = new Audio(correctSound);
  audio_incorrect = new Audio(incorrectSound);

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
    this.checkPlay();
  }
  
  approx(value) {
    if (value != null){return value.toFixed(2);}
    return 0; 
  }

  checkPlay(){
    if ((new Date() - this.state.soundLastPlayed)>this.state.soundTimeDiff){
      //Its been soundTimeDiff/1000 seconds since tune was played
      if ((Math.abs(this.state.ori_y) > (180-this.state.soundDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.soundDegreeVar)))){
          //When phone sideways, y is near 180, z is near 0 - phone tilted forward
          this.setState({soundLastPlayed:new Date()});
          this.audio_correct.play();
      }
      if ((Math.abs(this.state.ori_y) < (0+this.state.soundDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.soundDegreeVar)))){
        //When phone sideways, y is near 0, z is near 0
        this.setState({soundLastPlayed:new Date()});
        this.audio_incorrect.play();
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
      </Card>
    );
  }
}

export default Accelerometer;