import React, {useState} from "react";
import axios from "axios";
import FileBase64 from 'react-file-base64';

export default function AddRegPayment(){


    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Amount, setAmount] = useState("");
    const [DepositSlip, setDepositSlip] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newPayment = {
            SID,
            Email,
            Amount,
            DepositSlip
        }

        // has 3 args with authentication
        axios.post("http://localhost:8070/studentRegistrationPayment/add",newPayment).then(()=>{
        alert("Payment Added")
        window.location.reload(false);
        }).catch((err)=>{
            
        alert("Error adding payment")
    })

    }

    

    return(
    
            <div className="container" style={{maxWidth:"500px", marginTop:"100px", border: "3px solid #0d6efd",borderRadius:"10px", padding:"10px 40px 40px 40px"}}>
                <h4 style={{textAlign: "center", margin:"10px 5px 40px 5px"}}>Make Registration Payment</h4>
                <form style={{display:"flex", flexDirection:"column"}} onSubmit={sendData}>
                    <div className="mb-3">
                        <label for="SID" className="form-label">Student ID: </label>
                        <input type="text" className="form-control" placeholder="S001" pattern="[S][0-9]{3,}" id="SID" 
                        onChange={(e)=>{

                            setSID(e.target.value);

                        }}/>          
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email: </label>
                        <input type="email" placeholder="johndoe@gmail.com" className="form-control" id="email"
                        onChange={(e)=>{

                            setEmail(e.target.value);

                        }}/>          
                    </div>

                    <div className="mb-3">
                        <label for="amount" className="form-label">Amount (Rs): </label>
                        <input type="number" placeholder="5000.00" min="5000.00" className="form-control" id="amount"
                        onChange={(e)=>{

                            setAmount(e.target.value);

                        }}/>          
                    </div>

                    <div class="mb-3">
                        <label for="depositSlip" class="form-label">Upload bank depost slip </label>      
                    </div>

                    <div class="mb-3">
                    <FileBase64
                        multiple={ false }
                        onDone={ ({base64}) =>setDepositSlip(base64)} />      
                    </div>
                    
                    
                    <button style={{alignSelf:"center", marginTop:"20px"}} type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
    )
}