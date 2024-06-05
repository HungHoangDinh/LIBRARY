import { User} from '../models/schema.js';
export const totalUser= async(req,res)=>{
    User.find().then(result=>{
       res.status(200).json({
           error: false,
           message: result.length,
       });
   }).catch(err=>{
       console.log(err);
           res.status(500);
   }); 
   
}