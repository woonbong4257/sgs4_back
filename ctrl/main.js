const pool = require("../DB/db")

exports.getMain = async(req,res)=>{
  const user = req.session.user;
  const type = req.session.type;
  res.send({user: user, type: type})
}