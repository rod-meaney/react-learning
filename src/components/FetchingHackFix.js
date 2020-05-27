import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class User extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:props.title,
      email:props.email,
      firstname:props.firstname,
      lastname:props.lastname,
      id:props.id
    }  
  }
  render() {
    return(
    <ListGroup.Item>{this.state.title} {this.state.firstname} {this.state.lastname}
    <span className="float-right">
      <Button color="red" size={30} onClick={() => this.props.delete(this.state.id)}>del</Button>
    </span>
    </ListGroup.Item>
    );
  }
}

class FetchingHack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users:[]
    }
  }

  componentDidMount(){
    fetch('https://api.randomuser.me/?results=20')
    .then(results => {return results.json()})
    .then(data => {
      let fetched_users = data.results.map((user,index) => {
        return(
          <User 
            key={index}  
            title={user.name.title} 
            email={user.email} 
            firstname={user.name.first} 
            lastname={user.name.last} 
            id={`${index}`}
            delete={this.deleteItem.bind(this)}
            />
        )
      });
      this.setState({users:fetched_users});
    });
  }

  deleteItem(id) {
    this.setState({users:this.state.users.filter(item => item.props.id !== id)});
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <ListGroup>
            {this.state.users.map((item) => item)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

const FetchingHackFix = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  !(data || error) && fetch("https://api.randomuser.me/?results=20", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "Accept-Charset": "utf-8"
    }
  }).then(result => result.json()
  ).then(setData
  ).catch(setError);

  return data ? (
    <ListGroup>
      {data.results.map((user,index) => (
        <ListGroup.Item key={index}>
          {user.title} {user.firstname} {user.lastname}
        </ListGroup.Item>
      ))};
    </ListGroup>
  ) : (error ? error : "loading");
}

export default FetchingHackFix;