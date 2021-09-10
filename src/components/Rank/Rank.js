import React  from "react";

const Rank =({name,rank})=>{
    return (
        <div className='white f3 center'>
             <div className='white f3'>
                {name}
                 {' , your rank is...'}
             </div>

             <div className="white f3">
                 {rank}
             </div>
        </div>
    );
}
export default Rank;