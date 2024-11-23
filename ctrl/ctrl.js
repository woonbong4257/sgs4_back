const pool = require("../DB/db")

exports.postloginCtrl = async (req, res) => {
  try {
    const { id, pw } = req.body.info;
    const [selDocInfo] = await pool.query(
      `SELECT * FROM doctor WHERE doctor_id = ? AND pw = ?`,
      [id, pw]
    );

    if (selDocInfo.length > 0) {
      req.session.user = id;
      req.session.type = "doctor";
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).send({msg: "Session save error"});
        }
        res.status(200).send({msg: "Login successful"});
      });
    } else {
      const [selNurInfo] = await pool.query(
        `SELECT * FROM nurse WHERE nurse_id = ? AND pw = ?`,
        [id, pw]
      );

      if (selNurInfo.length > 0) {
        req.session.user = id;
        req.session.type = "nurse";
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).send({msg: "Session save error"});
          }
          res.status(200).send({msg: "Login successful"}); //정상적으로 세션저장이 완료되면 msg를 프론트로 전송
        });
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
