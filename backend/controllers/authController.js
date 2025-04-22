import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.models.js';
import transporter from '../config/nodemailer.js';

export const register=async(req,res)=>{
const{name,email,password}=req.body;
if(!name || !email || !password){
    return res.json({success:false,message:"Missing Details"})

}
try{
    const existingUser=await userModel.findOne({email})

    if(existingUser==true){
        return res.json({success:false,message:"user already exists"});
    }
    const hashedPassword= await bcrypt.hash(password,10);
    
    const user=new userModel({name,email,password:hashedPassword});
    await user.save();

const token=jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '7d'} );//id id generated automatically in mongoDB

res.cookie('token',token, { 
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge: 7*24*60*60*1000 //in msec
});
//sending email
const mailOptions={
    from:process.env.SENDER_EMAIL,
    to:email,
    subject:"welcome to vanshika bansal app",
    text:`welcome!your account has been created with email id: ${email}`

}
await transporter.sendMail(mailOptions);


return res.json({success:true});

}catch(error){
    res.json({success:false,message:error.message})
}};
 


export const login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.json({success:false,message:'email and password required'})
    }
    try{
       const user=await userModel.findOne({email});
       if(!user){
        return res.json({success:false,message:'Invalid email'})
       }
       const isMatch=await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.json({success:false,message:"invalid password"})
       }

       const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
       res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge: 7*24*60*60*1000 //in msec
    });

    return res.json({success:true});
       

    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const logout=async(req,res)=>{
    try{
res.clearCookie('token',{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge: 7*24*60*60*1000 //in msec
});
return res.json({success:true,message:"logged out"});
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }

}
//send verification otp to users email
export const sendVerifyOtp=async ()=>{
    try{
        const {userId}=req.body;
        
        const user=await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success:false,message:"Account already verified"})
        }
      const otp= String(Math.floor(100000+ Math.random()*900000));  //to generate otp
user.verifyOtp=otp;
user.verifyOtpExpireAt=Date.now()+24*60*60*1000

await user.save();
const mailOptions={
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:"acoount verification OTP",
        text:`your OTP is ${otp}. verify your account using this OTP.`
    }
await transporter.sendMail(mailOptions);

res.json({success:true,message:"verification Otp send on email"})
}

    catch(error){
        res.json({success:false ,message:error.messsage});
    }
}

export const verifyEmail=async(req,res)=>{
const {userId, otp}=req.body;
if(!userId ||!otp){
    return res.json({success:false,message:"missing details"});
}

try{
      const user=await userModel.findById(userId);
      if(!user){
        return res.json({success:false,message:"user not found"});

      }
      if(user.verifyOtp===''||user.verifyOtp!==otp){
        return res.json({success:false,message:"invalid otp"});
      }
      if(user.verifyOtpExpireAt<Date.now()){
        return res.json({success:false,message:"otp expired"});
      }
      user.isAccountVerified=true;
      user.verifyOtp='';
      user.verifyOtpExpireAt=0;
      await user.save();
      return res.json({success:true,message:"email verified successfully"});


}catch(error){
    return res.json({success:false,message:error.message});
}



};
