import React from 'react';
import {Link} from 'react-router-dom';
import MemberMenu from './MemberMenu';

const AppHeader = ({ title,navigate }) => {

    return (<nav className="navbar navbar-expand-lg navbar-light  AppHeader">
        <Link className="navbar-brand" to="/">{title}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <Link className="nav-link" to="/book/list">Books <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item active" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <Link className="nav-link" to="/book/add">Add Book <span className="sr-only">(current)</span></Link>
                </li>
            </ul>
            
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
           <MemberMenu/>
        </div>

    </nav>);

};

export default AppHeader;