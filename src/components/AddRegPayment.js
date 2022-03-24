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
            <div className="container">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label for="SID" className="form-label">Student ID: </label>
                        <input type="text" className="form-control" id="SID" 
                        onChange={(e)=>{

                            setSID(e.target.value);

                        }}/>          
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email: </label>
                        <input type="email" className="form-control" id="email"
                        onChange={(e)=>{

                            setEmail(e.target.value);

                        }}/>          
                    </div>

                    <div className="mb-3">
                        <label for="amount" className="form-label">Amount: </label>
                        <input type="number" className="form-control" id="amount"
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
                    
                    
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
    )
}