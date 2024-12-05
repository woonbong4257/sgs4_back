const pool = require("../DB/db")

exports.getDetInfo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [name] = await pool.query("SELECT name FROM patient WHERE patient = ?",[id])
    const [selClinic] = await pool.query(`
      SELECT * FROM clinic WHERE patient_patient = ?`,[id])
    const [selPres] = await pool.query(`
      SELECT * FROM prescription WHERE patient_patient = ?`,[id])
    console.log(selClinic, selPres)
    res.send({name: name[0].name, clinic: selClinic, pres: selPres })
  } catch (err) {
    console.error(err);
  }
};

