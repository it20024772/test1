const router = require("express").Router();
let modulePay = require("../models/subjectPay");

router.route("/displayPending").get(async (req,res)=>{
    await modulePay.find({Status:{ $in: ["pending", "reviewing" ] }}).sort({Status:'-1', createdAt: 'asc'}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/display").get(async (req,res)=>{
    await modulePay.find().sort({ createdAt: 'asc'}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/displayOne/:pid").get((req,res)=>{
    let PID = req.params.pid;
    modulePay.findOne({_id:PID}).then((payments)=>{
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
        const update = await modulePay.findByIdAndUpdate(PID,{Status:stateToBeUpdated}).then(()=>{
            res.status(200).send({status:"status updated"})
        }).catch((err)=>{
            console.log(err);
        })

            res.status(200).send()

    }
    
})

module.exports = router;