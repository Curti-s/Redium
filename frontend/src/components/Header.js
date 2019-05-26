import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
              <a className="navbar-brand" id="logo" href="/">
                <img
                  alt="Stories"
                  src="/assets/img/stories-logo.svg"
                  height="40"
                />
              </a>
            </div>
            <ul className="navbar-nav filter-links">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Top stories
                </a>
              </li>
              {auth0Client.isAuthenticated() && (
                <li className="nav-item sign-in-button">
                  <button
                    className="btn button green-border-button"
                    onClick={() => {
                      this.signOut();
                    }}
                  >
                    Sign out
                  </button>
                </li>
              )}
            </ul>

            <div className="folding-nav">
              <ul className="nav navbar-nav navbar-right">
                {this.props.isAuth && auth0Client.isAuthenticated() ? (
                  <li className="new-post-button">
                    <a
                      className="button"
                      data-behavior="trigger-overlay"
                      href="/edidor"
                    >
                      Write a story
                    </a>
                  </li>
                ) : (
                  <li
                    onClick={this.props.openSignInWith}
                    className="sign-in-button"
                  >
                    <a
                      className="button green-border-button"
                      data-behavior="trigger-overlay"
                      href="#"
                    >
                      Sign in / Sign up
                    </a>
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
