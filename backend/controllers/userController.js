import userModel from "../models/user.models";
export const getUserData=async(req,res)=>{
    try{
const {userId}=req.body;
const user =await userModel.finById(userId);
if(!user)
{
    return res.json({success:false,message:'user not found'});
}
res.json({
    success:true,
    UserData:{
name:user.name,
isAccountVerified:user.isAccountVerified
    }
});
    }
    catch(error)
    {
        res.json({success:false,message:error.message});
    }
}