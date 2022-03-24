import React,{useState, useEffect} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReviewRegPayments(){
    const [payment, setPayment] = useState("");

    const {state} = useLocation();
    const {pid} = state;


    const stateToBeUpdated = "accepted"
    const [currentState, setCurrentStatus] = useState("");

    let navigate = useNavigate();

    useEffect(()=>{
        function getPayment(){
            axios.get(`http://localhost:8070/registrationPayments/displayOne/${pid}`).then((res)=>{
                setPayment(res.data);

            }).catch((err)=>{
                // alert(err.message)
                console.log(err.message)
            })
        }
        getPayment();
    },[])

    function acceptPayment(e){
        e.preventDefault();
        setCurrentStatus(payment.Status);

        const statusData = {
            stateToBeUpdated,
            currentState
        }

        axios.put(`http://localhost:8070/registrationPayments/update/${pid}`, statusData).then(()=>{
            alert("payment accepted")
            navigate("/ShowRegistrationPayments");
        }).catch((err)=>{
           
        alert(err)
    })
}

    return(
        <div>
            <h1>Review Reg. Payment</h1>
            <br></br>
            <p>Student ID</p>
            <p>{payment.SID}</p>
            <p>Amount</p>
            <p>{payment.Amount}</p>
            <p>Date</p>
            <p>{payment.date}</p>
            <p>Deposit Slip</p>
            <img src={payment.DepositSlip} width={500} height={300}/><br/>
            <a download={payment.SID} href={payment.DepositSlip}>Download</a>

            <p>Status</p>
            <p>{payment.Status}</p>
            <form onSubmit={acceptPayment}>
                            <button type="submit" class="btn btn-primary">Accept</button>
            </form>
        </div>
    )
}