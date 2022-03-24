import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShowRegistrationPayments(){

    const [payments, setPayments] = useState([]);
    const [PID, setPID] = useState("");
    const stateToBeUpdated = "reviewing"
    const [currentState, setCurrentStatus] = useState("");

    let navigate = useNavigate();


    useEffect(()=>{
        function getPayments(){
            axios.get("http://localhost:8070/registrationPayments/displayPending/").then((res)=>{
                setPayments(res.data);

            }).catch((err)=>{
                console.log(err.message)
                alert(err.message)
            })
        }
        getPayments();
    },[])

    function reviewData(e){
        e.preventDefault();

        const statusData = {
            stateToBeUpdated,
            currentState
        }

        axios.put(`http://localhost:8070/registrationPayments/update/${PID}`, statusData).then(()=>{
        }).catch((err)=>{
           
        alert(err)
    })

    navigate("/ReviewRegPayment",{ state: { pid: PID } });
}

    return(
        <div>
            <h1>Registration Payments - Admin</h1>
            <table class="table">
                <tr>
                    <th>SID</th>
                    <th>Amount(Rs.)</th>
                    <th>Deposit Slip</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>

                {payments.map((payment) => (
                    <tr>
                        <td>{payment.SID}</td>
                        <td>{payment.Amount}</td>
                        <td>{payment.date}</td>
                        <td>{payment.Status}</td>
                        <td><form onSubmit={reviewData}>
                            <input value={payment.Status} hidden="true" onChange={(e)=>{
                            setCurrentStatus(e.target.value);
                            }}/>
                            <button type="submit" value={payment._id} class="btn btn-warning" onClick={(e)=>{
                            setPID(e.target.value);                           
                            }}>Review</button>
                            </form>
                        </td>
                    </tr>
          
                ))}
            </table>
        </div>

    )
}