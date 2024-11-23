const pool  = require("../DB/db")

exports.postLogout = async(req, res)=>{
  const user = req.session.user
  console.log(user)
  
  if(user){
    req.session.destroy(()=>{ 
    req.session;
    });
  }
  else{
    console.log("세션 없음")
  }
  
}