import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  logoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-1'>
          <Link className='nav-link' to='/feed'>
            Post Feed
          </Link>
        </li>
        <li className='nav-item mr-3'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item mt-2'>
          <a
            href='/#'
            onClick={(e) => this.logoutClick(e)}
            style={{
              color: "grey",
              textDecoration: "none",
            }}
            className='nav-item'
          >
            <img
              className='rounded-circle'
              src={user.avatar}
              alt={user.name}
              style={{
                width: "25px",
                marginRight: "5px",
              }}
              title='you must have gravatar connected to your profile to display an image'
            />
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            DevelopersWeb
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/profiles'>
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);