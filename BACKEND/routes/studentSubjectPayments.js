const router = require("express").Router();
let modulePay = require("../models/subjectPay");

router.route("/add").post(async (req, res)=>{
    const SID = req.body.SID;
    // const Date = Date(req.body.Date);
    const Amount = Number(req.body.Amount);
    const DepositSlip = req.body.DepositSlip;
    const Status = "pending";
    const Module = req.body.Module;
    const Year = req.body.Year;
    const Semester = req.body.Semester;
    const Email = req.body.Email;
    const date = new Date().toISOString().slice(0, 10);

    const newModulePay = new modulePay({
        SID,
        Amount,
        date,
        Email,
        DepositSlip,
        Status,
        Module,
        Year,
        Semester
    })

    await newModulePay.save().then(()=>{
        res.json("payment added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/display/:sid").get(async (req,res)=>{
    let SID = req.params.sid;
    await modulePay.find({SID:SID, Status:"pending"}).sort({ createdAt: 'asc'}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

// router.route("/update/:id").put(async (req, res) => {
//     let PID = req.params.id;
//     const {SID,Date,Amount,DepositSlip,Status,Module,Year,Semester} = req.body;

//     const updateModulePay = {
//         SID,
//         Amount,
//         DepositSlip,
//         Status,
//         Module,
//         Year,
//         Semester
//     }

//     const update = await modulePay.findByIdAndUpdate(PID, updateModulePay).then(()=>{
//         res.status(200).send({status:"payment updated"})
//     }).catch((err)=>{
//         console.log(err);
//     })

// })

router.route("/delete/:id").delete(async (req,res)=>{
    let PID = req.params.id;

    await modulePay.findByIdAndDelete(PID).then(()=>{
        res.status(200).send({status:"payment deleted"})
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;

