const UserModel = require("../models/user")
const jwt = require("jsonwebtoken")


const bcrypt=require("bcrypt")
const signup=async(req,res)=>{


  try {
    const{name,email,password}=req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const userModel = new UserModel({
      name,
      email,
      password: hashedPassword
    })

    await userModel.save()

    res.status(201).json({
      message: "Signup successfully",
      success: true
    })

  }catch (error) {
    res.status(500).json({message:"signup server erroer",success:false})
    
  }
}



const login = async (req, res) => {
  try {
    const { email, password } = req.body

 
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    }

 
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false
      })
    }
    const jwtToken=jwt.sign({user:email,_id: user._id,},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
    )

 
    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
      name:user.name
    })

  } catch (error) {
    res.status(500).json({
      message: "Login server error",
      success: false
    })
  }
}




module.exports={signup,login}