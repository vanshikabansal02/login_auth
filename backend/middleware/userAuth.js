import jwt from "jsonwebtoken";

const userAuth=async(req,res,next)=>{
const {token}=req.cookies;
if(!token){
    return res.json({success:false,message:"not authorized"})
}
try{
 const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
 if(tokenDecode.id)
 {
    req.body.userId=tokenDecode.id
 }
 else{
    return res.json({success:false,message:"not authorized. Try Again"})
 }
 next();
}
catch(error){
    return res.json({success:false,message:"no"});
}
};
export default userAuth;