import React  from "react";

const Navigation =({onRouteChange,signedin,SignOut})=>{
    if (signedin==='home'){
        return(
            <nav style={{display:'flex' , justifyContent:'flex-end'}}>
                <p onClick={SignOut} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }
    else
    {
        return(
            <nav style={{display:'flex' , justifyContent:'flex-end'}}>
                <p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Signin</p>
                <p onClick={()=>onRouteChange('signup')} className="f3 link dim black underline pa3 pointer">SignUp</p>
            </nav>
        );
    }
    
}
export default Navigation;