const express = require('express');
const router = express.Router();
//사용할 컨트롤러 선언
const main = require("../ctrl/main")
const ctrl = require('../ctrl/ctrl') 
const logout = require("../ctrl/logout")
const mypage = require("../ctrl/mypage")
const patInfo = require("../ctrl/patInfo")
const clinic = require("../ctrl/clinic")
const pers = require("../ctrl/prescription")
const detInfo = require("../ctrl/detInfo")


/* 
라우터 선언하고 get, post분리 
get의 경우에는 프론트로 데이터를 객체 형태로 보내는 역할로 사용
post는 프론트에서 이벤트가 있을 경우 값을 담아서 서버로 전송
모든 컨트롤러에 get, post가 다 존재하지는 않음
*/
router.get('/', main.getMain)

router.post('/login', ctrl.postloginCtrl);

router.post("/logout", logout.postLogout);

router.get("/mypage", mypage.getMyPage);

router.get("/patInfo", patInfo.getPatInfo)
router.post("/patInfo", patInfo.postPatInfo)

router.post("/clinic", clinic.postClinic)

router.post("/pers", pers.postPers)

router.get("/detinfo/:id", detInfo.getDetInfo)

module.exports = router;