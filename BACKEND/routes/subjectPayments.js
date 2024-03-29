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

router.route("/display/:sid").get((req,res)=>{
    let SID = req.params.sid;
    modulePay.find({SID:SID, Status:{ $in: ["pending", "reviewing" ] }}).then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/reportSubPay/:year").get((req, res)=>{
        let year = req.params.year;

        modulePay.find({Status:"accepted"}).then((payments)=>{

            let totSubPay = 0;
            let numSubPay = 0;

            payments.map((p)=>{
                if (p.date.slice(0,4) === year){
                    totSubPay += p.Amount;
                    numSubPay += 1;
                }
            })

            const subReport = {
                totSubPay,
                numSubPay
            }
            res.json(subReport)
        }).catch((err)=>{
            console.log(err);
        })

})



module.exports = router;