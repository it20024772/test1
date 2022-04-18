import React,{useState, useEffect} from "react";
import axios from "axios";

export default function MyPendingPayments(){


    const [payments, setPayments] = useState([]);
    const [PID, setPID] = useState("");

    useEffect(()=>{
        function getPayments(){
            axios.get("http://localhost:8070/studentSubjectPayment/display/S002").then((res)=>{
                setPayments(res.data);

            }).catch((err)=>{
                alert(err.message)
            })
        }
        getPayments();
    },[])

    function deleteData(e){
        e.preventDefault();
        axios.delete(`http://localhost:8070/studentSubjectPayment/delete/${PID}`).then(()=>{
        alert("Payment Deleted")
        window.location.reload(false);
        }).catch((err)=>{
            
        alert(err)
    })

    }

    return(
        <div className="container">
            <h2 style={{textAlign: "center", margin:"20px"}}>My Pending Payments</h2>

            <div style={{padding:"5px 100px 5px 100px"}}>
            <table class="table table-striped">
            <thead>
                <tr class="table-primary">
                    <th>Module Code</th>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Amount(Rs.)</th>
                    <th>Deposit Slip</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {payments.map((payment) => (
                    <tr>
                        <td>{payment.Module}</td>
                        <td>{payment.Year}</td>
                        <td>{payment.Semester}</td>
                        <td>{payment.Amount}</td>
                        <td><a download={payment.SID} href={payment.DepositSlip}>Download Image</a></td>
                        <td>{payment.date}</td>
                        <td>{payment.Status}</td>
                        <td><form onSubmit={deleteData}>
                            <button type="submit" value={payment._id} class="btn btn-danger" onClick={(e)=>{
                            setPID(e.target.value);
                            }}>Delete</button>
                            </form>
                        </td>
                    </tr>
          
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}