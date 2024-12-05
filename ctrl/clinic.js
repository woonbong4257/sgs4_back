const pool = require("../DB/db")

exports.postClinic = async(req,res)=>{
  try{
    const user = req.session.user;
    const type = req.session.type;
    const {name, dis, info} = req.body
    const [selcName] = await pool.query("SELECT patient FROM patient")
    if(selcName.length < 1){
      res.send({msg: "환자정보가 없습니다."})
    }
    else{
      const insCli = await pool.query("INSERT INTO clinic VALUES(null, ?, now(), ?,?,?)",[dis,info, name, user])
      res.send({msg:"진료내용 등록 완료"})
    }

  }
  catch(err){
    console.error(err)
  }
}