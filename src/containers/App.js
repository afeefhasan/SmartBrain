import React, { Component,useEffect } from 'react';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Logo from '../components/Logo/Logo';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Rank from '../components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

import Signin from '../components/Signin/Signin';
import Signup from '../components/Signup/Signup';


const ParticleOptions={
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }
}
}

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      
      signedin:'',
      user:JSON.parse(localStorage.getItem('user')) ||{
        email:'',
        name:'',
        rank:'',
        id:'',
        joined:''
      },
      route:JSON.parse(localStorage.getItem('route')) ||'signin'
    }
    this.onUpdate = this.onUpdate.bind(this);
    
    this.onImageSubmit = this.onImageSubmit.bind(this);
  }


  onUpdate = (event)=>{
    this.setState({input:event.target.value})
  }
  calculateFacelocation=(data)=>{
    const Face=data;
    const image=document.getElementById('imagebox');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftcol:Face.left_col*width,
      toprow:Face.top_row*height,
      rightcol:width-(Face.right_col*width),
      bottomrow:height-(Face.bottom_row*height)

    }
  }
  displayBox=(box)=>{

    this.setState({box:box})
  }
  onImageSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
    fetch('https://boiling-tundra-65944.herokuapp.com/clarifai',
    {
        method:'post',
        headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
        body:JSON.stringify({
            input:this.state.input
        })
    }
    )
    .then(response=>response.json())
    .then(response =>
      {
        if(response.outputs[0].data.regions){
          fetch('https://boiling-tundra-65944.herokuapp.com/rank',
        {
            method:'put',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                id:this.state.user.id
            })
        }
        )
        .then(res => res.json())
        .then(count =>{
            var item=JSON.parse(localStorage.getItem('user'))
            this.setState(Object.assign(this.state.user,{rank:count}))
            item.rank=this.state.user.rank
            localStorage.setItem('user',JSON.stringify(item))
        })
        }
        this.displayBox(this.calculateFacelocation(response.outputs[0].data.regions[0].region_info.bounding_box))
      }) 
      .catch(err => console.log(err));
  }
  Loaduser=(data)=>{
      this.setState(
        {
          user:{
            name:data.name,
          email:data.email,
          rank:data.rank,
          id:data._id,
          joined:data.joined,
          }
        }
      )
      this.onRouteChange('home');
      localStorage.setItem('user', JSON.stringify(this.state.user))
      localStorage.setItem('route', JSON.stringify(this.state.route))
  }
  onRouteChange=(route)=>{
    if (route==='home'){
      this.setState({signedin:true})
    }
    else if (route==='signin'){
      this.setState({signedin:false})
    }


    this.setState({route:route})
  }

  SignOut=()=>{
    localStorage.clear();
    this.setState({imageUrl:''})
    this.onRouteChange('signin');
  }

  render(){
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
    return(
      <div className="App">
        <Particles className="particles" params={ParticleOptions} />
        <Navigation onRouteChange={this.onRouteChange} SignOut={this.SignOut} signedin={this.state.route}/>
         
         {this.state.route==='home'?
         <div>
         
       <Logo />
        <Rank name={this.state.user.name} rank={this.state.user.rank}/>
        <ImageLinkForm onUpdate={this.onUpdate} onImageSubmit={this.onImageSubmit}/>
        <FaceRecognition box={this.state.box}imageUrl={this.state.imageUrl}/>
        </div>
        :
        (
          this.state.route==='signin'?
          <Signin onRouteChange={this.onRouteChange} Loaduser={this.Loaduser}/>
          :
          <Signup onRouteChange={this.onRouteChange} Loaduser={this.Loaduser}/>
        )
        
        }
         
         
      </div>
     
  
    );
  }
 
  
}

export default App;