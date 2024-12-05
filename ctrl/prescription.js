const pool = require("../DB/db")

exports.postPers = async(req,res)=>{
  try{
    const user = req.session.user;
    const type = req.session.type;
    const {name, pers} = req.body
    const [selcName] = await pool.query("SELECT patient FROM patient")
    if(selcName.length < 1){
      res.send({msg: "환자정보가 없습니다."})
    }
    else{
      const insPers = await pool.query("INSERT INTO prescription VALUES(null, now(), ?,?,?)",[pers, user, name])
      res.send({msg:"치료내용 등록 완료"})
    }

  }
  catch(err){
    console.error(err)
  }
}