const{Router}=require("express");
const router= Router();
const {vonageCall, vonageSMS} = require("../controller/vonage.controller");
router.post("/call", vonageCall);
router.post("/sms", vonageSMS)
module.exports=router;