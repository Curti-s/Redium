import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import auth0Client from "../utils/Auth";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    auth0Client.signOut();
    this.props.history.replace("/");
  }

  render() {
    return (
      <div>
        <div data-react-classname="UserOverlay" data-react-props="{}">
          <div className="overlay overlay-hugeinc " data-reactroot="">
            <button className="overlay-close">
              <span className="glyphicon glyphicon-remove" />
            </button>
            <nav className="users-overlay">
              <h2 className="grayed-heading center" />
              <ul>
                <li className="pagination-button-group" />
              </ul>
            </nav>
          </div>
        </div>

        <div data-behavior="progress-bar" className="progress-bar" />

        <nav
          data-behavior="animated-navbar"
          className="navbar navbar-expand-sm navbar-light navbar-fixed-top is-inView"
        >
          <div className="">
            <div className="navbar-header">
              <Link className="navbar-brand" id="logo" to="/">
                <img
                  alt="Stories"
                  src="/assets/img/redium_logo.png"
                  width="50"
                />
              </Link>
            </div>
            <ul className="navbar-nav filter-links">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Top stories
                  </a>
                </li>
              </Link>
              {auth0Client.isAuthenticated() && (
                <Link to="/editor" data-behavior="trigger-overlay">
                  <li className="new-post-button">Write a story</li>
                </Link>
              )}
            </ul>

            <div className="folding-nav">
              <ul className="nav navbar-nav navbar-right">
                {auth0Client.isAuthenticated() ? (
                  <li className="nav-item ">
                    <button
                      className="btn sign-in-button"
                      onClick={() => {
                        this.signOut();
                      }}
                    >
                      Sign out
                    </button>
                  </li>
                ) : (
                  <li className="nav-item">
                    <button
                      onClick={auth0Client.signIn}
                      className="btn sign-in-button"
                    >
                      Sign in
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authUser.user,
    isAuth: state.authUser.isAuth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openSignInWith: () => {
      dispatch({ type: "TOGGLE_MODAL", modalMode: true });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
