import React  from "react";

const ImageLinkForm =({onUpdate,onImageSubmit})=>{
    return (
        <div>
            <p className="f3 center">
                {'You Can here detect the faces in pictures'}
            </p>
        <form className="center">
            <div className="pa4 br5 center shadow-5">
            <input type="text" className="f4 pa2 w-70 center" onChange={onUpdate}/>
            <a className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer" onClick={onImageSubmit}>
                Detect
            </a>
            </div>
            
        </form>
        </div>
    );
}
export default ImageLinkForm;