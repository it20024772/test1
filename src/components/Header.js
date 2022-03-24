import React from "react";

function Header(){

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://google.com">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link active" aria-current="page" href="https://google.com">Home</a>
                    <a className="nav-link" href="/regPayment">Registration Payments</a>
                    <a className="nav-link" href="/subPayment">Subject Payments</a>
                    <a className="nav-link" href="/pendingPayments">My Pending Payments</a>
                    <a className="nav-link" href="/ShowRegistrationPayments">Reg Payments- Admin</a>
                    <a className="nav-link" href="/ShowSubjectPayments">Sub Payments- Admin</a>
                </div>
                </div>
            </div>
        </nav>

    )
}

export default Header;