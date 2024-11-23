const pool = require("../DB/db")

exports.getMyPage = async(req, res)=>{
  const user = req.session.user;
  const type = req.session.type;


  if(type === "doctor"){
    const [selDocInfo] = await pool.query(`SELECT * FROM doctor WHERE doctor_id = ?`,[user])
    const [depNur] =  await pool.query(`
      SELECT B.name FROM department A
      INNER JOIN nurse B ON A.name = B.department_name
      WHERE department_name = ?`, [selDocInfo[0].department_name])
    const [depLoc] = await pool.query(`SELECT location FROM department WHERE name =?`,[selDocInfo[0].department_name])
    console.log(depNur)
    res.send({
      name: selDocInfo[0].name, 
      dep: selDocInfo[0].department_name, 
      type: "의사",
      nur: depNur,
      loc: depLoc[0].location
    })
  }
  
  else{
    const [selNurInfo] = await pool.query(`SELECT * FROM nurse WHERE nurse_id = ?`,[user])
    console.log(selNurInfo[0])
    const [depLoc] = await pool.query(`
      SELECT A.location, B.name FROM department A
      INNER JOIN doctor B ON A.doctor_doctor_id = B.doctor_id 
      WHERE A.name = ?`, [selNurInfo[0].department_name])
    res.send({
      name: selNurInfo[0].name, 
      dep: selNurInfo[0].department_name, 
      type: "간호사", 
      doc: depLoc[0].name, 
      loc: depLoc[0].location
    })
  }
  
}