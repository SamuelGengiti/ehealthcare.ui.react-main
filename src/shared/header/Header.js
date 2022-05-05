
import './Header.css';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

function Header() {

    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem('user'));
    function handleSignIn() {
        history.push('/login');
    }

    function handleSignOut() {
        sessionStorage.removeItem('user');
        history.push('/login');
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <span className="header">E-Healthcare Management</span>
            {
                user && user.isAdmin &&
                <div style={{ display: "flex" }} >
                    <a className="menu" href="/products">Products</a>&nbsp;&nbsp;&nbsp;
                    <a className="menu" href="/categories">Categories</a>
                </div>
            }

            <div style={{ display: "flex", float: "right" }}>
                {
                    user && user.isAdmin &&
                    <span>
                        <a href="javascript:void(0)"><i class="pi pi-shopping-cart"></i></a>
                        <h6>Hello, {user.firstName} &nbsp;&nbsp;</h6>
                    </span>
                }
                {
                    !user && <Button className="p-button-warning" type="button" onClick={handleSignIn} label="Sign In" icon="pi pi-user"
                        style={{ marginLeft: ".25em" }}></Button>
                }
                {
                    user && <Button className="p-button-warning" type="button" onClick={handleSignOut} label="Logout" icon="pi pi-power-off"
                        style={{ marginLeft: ".25em" }}></Button>
                }
            </div >
        </nav >
    );
}

export default Header;
