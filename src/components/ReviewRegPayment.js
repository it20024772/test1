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
        <div className="container" style={{maxWidth:"1000px", marginTop:"50px", border: "3px solid #0d6efd",borderRadius:"10px", padding:"10px 40px 40px 40px"}}>
            <h4 style={{textAlign: "center", margin:"10px 5px 40px 5px"}}>Payment Details</h4>
            <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <p>Student ID: {payment.SID}</p>
            <p>Amount: Rs. {payment.Amount}</p>
            <p>Date: {payment.date}</p>
            <p>Deposit Slip: </p>
            <img src={payment.DepositSlip} width={500} height={200}/><br/>
            <a download={payment.SID} href={payment.DepositSlip}>Download</a>
            
            <form style={{margin:"20px"}} onSubmit={acceptPayment}>
                <button type="submit" class="btn btn-primary">Accept</button>
            </form>
            </div>
        </div>
    )
}