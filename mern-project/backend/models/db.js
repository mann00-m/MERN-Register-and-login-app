const mongoose=require("mongoose")

function mongoDb(){
  mongoose.connect(process.env.MONGO_CONN)
  console.log("db connected successfully")
}

module.exports=mongoDb