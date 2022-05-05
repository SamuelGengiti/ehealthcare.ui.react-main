import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

import './SignUp.css';
import { useState } from 'react';

function SignUp() {

    const [invalidCreds, setInvalidCrds] = [false];
const [registrationData, setRegistrationData]=useState({});
    const history = useHistory();

    function handleChange(event) {
        const {name,value}=event.target;
        setRegistrationData({...registrationData,[name]:value});
    }

    function handleRegisterClick() {
        fetch("https://localhost:44303/api/User/signup",
        { method: 'POST',
        body:JSON.stringify(registrationData),
        headers:{"Content-type":"application/json; chartset=UTF-8"}
         }
    )
    }

    return (
        <div className="register">
            <Card title="Register" style={{ width: '45rem', marginBottom: '2em' }}>
                <div className="row">
                    <div className="col-md-6 box">
                        <h5>First Name</h5>
                        <input type="text" name="firstName" onChange={handleChange} className="form-control" />
                        <br />
                        <h5>Last Name</h5>
                        <input type="text" name="lastName" onChange={handleChange} className="form-control" />
                        <h5>Email</h5>
                        <input type="text" name="email" onChange={handleChange} className="form-control" />
                        <h5>Password</h5>
                        <input type="password" name="password" onChange={handleChange} className="form-control" />
                        <Button className="p-button-warning" style={{ marginLeft: ".25em", float: "right" , marginTop: "5px"}} type="button" onClick={handleRegisterClick} label="Register"
                        ></Button>

                    </div>
                    {
                        invalidCreds &&
                        <div className="alert alert-danger" role="alert">
                            Incorrect Email or Password
                         </div>
                    }
                </div >
            </Card >
        </div >
    )
}

export default SignUp;