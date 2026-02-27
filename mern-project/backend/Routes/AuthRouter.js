const express=require("express");
const { signupValidation, LoginValidation } = require("../Middleware/Authvalidation");
const { signup, login } = require("../Controllers/AuthController");
const router = express.Router();

router.post("/logi",(req,res)=>{
  res.send("login succsfully")});
router.post("/login",login,LoginValidation);
router.post("/signup",signup,signupValidation);

module.exports=router;






