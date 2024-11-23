const express = require('express');
const router = express.Router();
//사용할 컨트롤러 선언
const main = require("../ctrl/main")
const ctrl = require('../ctrl/ctrl') 
const logout = require("../ctrl/logout")
const mypage = require("../ctrl/mypage")

router.get('/', main.getMain)

router.post('/login', ctrl.postloginCtrl);

router.post("/logout", logout.postLogout);

router.get("/mypage", mypage.getMyPage);

module.exports = router;