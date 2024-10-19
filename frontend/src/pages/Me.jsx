 import { Link } from "react-router-dom"
export function Me(){
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-70 text-center p-2 h-max px-4">
           <span>Don't have an account ? </span>  
           <span className="font-bold ">
            <Link to="/signup" >create now</Link>
           </span>
        </div>
    </div>
    </div>
   
}