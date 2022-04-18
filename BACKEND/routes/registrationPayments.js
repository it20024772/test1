const router = require("express").Router();
let registrationPay = require("../models/registrationPay");

router.route("/displayPending").get((req,res)=>{
    registrationPay.find({Status:{ $in: ["pending", "reviewing" ] }}).sort({Status:'-1', createdAt: 'asc'}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/display").get((req,res)=>{
    registrationPay.find().sort({ createdAt: 'asc'}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/displayOne/:pid").get((req,res)=>{
    let PID = req.params.pid;
    
    registrationPay.findOne({_id:PID}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/update/:pid").put(async (req, res) => {
    let PID = req.params.pid;
    const stateToBeUpdated = req.body.stateToBeUpdated;
    const currentState = req.body.currentState;

    if (stateToBeUpdated != currentState){
        const update = await registrationPay.findByIdAndUpdate(PID,{Status:stateToBeUpdated}).then(()=>{
            res.status(200).send({status:"status updated"})
        }).catch((err)=>{
            console.log(err);
        })

            res.status(200).send()

    }
    // const {SID,Amount,date,Email,DepositSlip,Status} = req.body;

    // const updateRegPay = {
    //     SID,
    //     Amount,
    //     date,
    //     Email,
    //     DepositSlip,
    //     Status,
    // }


})

module.exports = router;