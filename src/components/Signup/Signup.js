import React  from "react";
import { Component } from "react/cjs/react.production.min";
 
class  Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:''
        }
        this.onSignup = this.onSignup.bind(this);
    }
    onEmailChange=(event)=>{
        this.setState({email:event.target.value})
    }
    onNameChange=(event)=>{
        this.setState({name:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({password:event.target.value})
    }
    onSignup(){
        fetch('https://boiling-tundra-65944.herokuapp.com/signup',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                rank:0,
                joined:''
            })
        }
        )
        .then(response => response.json())
        .then(user => {
          if (user._id) {
            this.props.Loaduser(user)
            this.props.onRouteChange('home');
          }
          else if(user==="present"){
              window.alert('user is already present');
          }
          else{
            window.alert('something went wrong');
          }
        })


    }
    render(){
        const {onRouteChange}=this.props;
        return (
            <article className="mw5 center  br3 mv-4  w-100 w-50-m w-25-l ba shadow-5">
                    <main className="pa4 black-80 center">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" required/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required/>
                </div>
                </fieldset>
                <div className="">
                <input 
                onClick={this.onSignup}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up" />
                </div>
            </div>
            </main>
            </article>
        );
    }
    
}
export default Signup;