import React,{Component}  from "react";
import "./Signin.css";
 
class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
        
        this.onSignin = this.onSignin.bind(this);
    }
    onEmailChange=(event)=>{
        this.setState({email:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({password:event.target.value})
    }
    onSignin(){
        fetch('https://boiling-tundra-65944.herokuapp.com/signin',
        {
            method:'post',
            headers:{'Content-Type':'application/json','Accept':'*/*','Connection':'keep-alive','Accept-Encoding' : 'gzip, deflate, br'},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        }
        )
        .then(res => res.json())
        .then(data =>{
            if ((data==='wrong password' )||(data==='Not Found')){
                window.alert('Wrong Id or Password')
            }
            else{
                this.props.Loaduser(data);
               
               
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
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="">
                <input 
                onClick={this.onSignin}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                <p  className="f6 link dim black db pointer" onClick={()=>onRouteChange('signup')}>Sign up</p>
            
                </div>
            </div>
            </main>
            </article>
        );
    }
    
}
export default Signin;