const pool = require("../DB/db")

exports.getPatInfo = async(req,res) =>{
  try{
    const [patInfo] = await pool.query("SELECT * FROM patient")
    console.log(patInfo)
    res.send(patInfo)
  }
  catch(err){
    console.error(err)
  }
}


exports.postPatInfo= async(req, res)=>{
  try{
    console.log(req.body)
    const {name, tel, pid} = req.body
    const insPatInfo = await pool.query("INSERT INTO patient VALUES(?, ?, ?)",[pid,name, tel])
    res.send({msg: "정상적으로 입력되었습니다."})
  }
  catch(err){
    console.error(err)
  }
}