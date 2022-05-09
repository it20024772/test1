const router = require("express").Router();
let registrationPay = require("../models/registrationPay");
let modulePay = require("../models/subjectPay");

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

router.route("/display/:sid").get((req,res)=>{
    let SID = req.params.sid;
    registrationPay.find({SID:SID, Status:{ $in: ["pending", "reviewing" ] }}).then((payments)=>{
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
})


router.route("/reportRegPay/:year").get((req, res)=>{
    let year = req.params.year;

    registrationPay.find({Status:"accepted"}).then((payments)=>{

        let totRegPay = 0;
        let numRegPay = 0;

        payments.map((p)=>{
            if (p.date.slice(0,4) === year){
                totRegPay += p.Amount;
                numRegPay += 1;
            }
        })

        const regReport = {
            totRegPay,
            numRegPay
        }
        res.json(regReport)
    }).catch((err)=>{
        console.log(err);
    })

})


module.exports = router;