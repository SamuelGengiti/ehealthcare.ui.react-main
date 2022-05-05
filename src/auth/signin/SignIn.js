import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

import './SignIn.css';
import { useState } from 'react';

function SignIn() {

    const [invalidCreds, setInvalidCrds] = [false];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const isLoggedIn = sessionStorage.getItem('user');
    if (isLoggedIn) {
        history.replace('/home');
    }

    function handleLoginClick() {
      /*  fetch("https://localhost:44303/api/User/Login?email=" + email + "&password=" + password, { method: 'POST' }).then(res => res.json()).then(res => {
            sessionStorage.setItem('user', JSON.stringify(res));
            history.replace('/home');
        });

        */

        fetch("https://localhost:44303/api/User/Login",
            { method: 'POST',
            body:JSON.stringify({
                email,
                password}),
            headers:{"Content-type":"application/json; chartset=UTF-8"}
             }
        )
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRegisterClick() {

    }

    return (
        <div className="login">
            <Card title="Login" style={{ width: '45rem', marginBottom: '2em' }}>
                <div className="row">
                    <div className="col-md-6">
                        <img className="rounded" height="270px" width="350px"
                            src="https://images.pexels.com/photos/3683040/pexels-photo-3683040.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" />
                    </div>
                    <div className="col-md-6 box">
                        <h5>Email</h5>
                        <input type="email" onChange={handleEmailChange} className="form-control" />
                        <br />
                        <h5>Password</h5>
                        <input type="password" onChange={handlePasswordChange} className="form-control" />
                        <br />
                        <Button style={{ marginLeft: ".25em", float: "right", backgroundColor:"blue", color:"white" }} type="button" onClick={handleLoginClick} label="Sign In"
                        ></Button>
                        <Button className="p-button-warning" style={{ marginLeft: ".25em", float: "right" }} type="button" onClick={handleRegisterClick} label="Register"
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

export default SignIn;