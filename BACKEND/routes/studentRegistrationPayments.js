const router = require("express").Router();
let registrationPay = require("../models/registrationPay");

router.route("/add").post((req, res)=>{

    const SID = req.body.SID;
    const Amount = Number(req.body.Amount);
    const DepositSlip = req.body.DepositSlip;
    const Status = "pending";
    const Email = req.body.Email;
    const date = new Date().toISOString().slice(0, 10);
    

    const newRegistrationPay = new registrationPay({
        SID,
        Amount,
        date,
        Email,
        DepositSlip,
        Status
    })

    newRegistrationPay.save().then(()=>{
        res.json("payment added")
    }).catch((err)=>{
        console.log(err);
    })

})

// router.route("/display/:sid").get((req,res)=>{
//     let SID = req.params.sid;
//     registrationPay.find({SID:SID, Status:"pending"}).then((payments)=>{
//         res.json(payments)
//     }).catch((err)=>{
//         console.log(err);
//     })

// })

// router.route("/update/:pid").put(async (req, res) => {
//     let PID = req.params.pid;
//     const {SID,Amount,DepositSlip,Status} = req.body;

    
//     const update = await registrationPay.findByIdAndUpdate(PID, {SID,Amount,DepositSlip,Status}).then(()=>{
//         res.status(200).send({status:"payment updated"})
//     }).catch((err)=>{
//         console.log(err);
//     })

// })

// router.route("/delete/:pid").delete(async (req,res)=>{
//     let PID = req.params.id;

//     await registrationPay.findByIdAndDelete(PID).then(()=>{
//         res.status(200).send({status:"payment deleted"})
//     }).catch((err)=>{
//         console.log(err);
//     })
// })



module.exports = router;