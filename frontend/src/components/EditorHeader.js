import React, { Component } from "react";
import { Link } from "react-router-dom";

class EditorHeader extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid col-md-10 col-md-offset-1">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand" id="logo">
                <img
                  alt="Stories"
                  src="/assets/img/stories-logo.svg"
                  height="40"
                />
              </Link>
            </div>
            <ul className="nav navbar-nav filter-links">
              <li>
                <a href="javascript:void(0);" data-behavior="editor-message" />
              </li>
            </ul>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="publish-button">
                  <button
                    onClick={() => this.props.publish()}
                    className={
                      this.props.loading === true
                        ? "button green-inner-button dropdown-toggle"
                        : "button green-border-button dropdown-toggle"
                    }
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.loading === true ? "Publishing" : "Publish"}{" "}
                    <i className="fa fa-globe" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div data-behavior="progress-bar" className="progress-bar" />
      </div>
    );
  }
}
export default EditorHeader;
