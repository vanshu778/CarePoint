import jwt from 'jsonwebtoken'

//admin authentication middeleware 
const AuthAdmin =async (req,res,next)=>{
    try {
        const {atoken}=req.headers
        if(!atoken){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode !==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error);
    res.json({success:false,message:error.message})
    }
}

export default AuthAdmin