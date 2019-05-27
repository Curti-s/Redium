import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./Header";
import Feed from "./Feed";
import Profile from "./Profile";
import ArticleView from "./ArticleView";
import Editor from "./Editor";
import SecuredRoute from "./SecuredRoute";
import Callback from "./Callback";
import auth0Client from "../utils/Auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true
    };
  }
  async componentDidMount() {
    if (this.props.location.pathname === "/callback")
      this.setState({ checkingSession: false });
    return;

    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    const pathname = window.location.pathname;
    return (
      <div>
        {!pathname.includes("editor") ? <Header /> : ""}

        <Switch>
          <Route exact path="/callback" component={Callback} />
          <Route exact path="/" component={Feed} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/articleview/:id" component={ArticleView} />
          <SecuredRoute
            path="/editor"
            component={Editor}
            checkingSession={this.state.checkingSession}
          />
          <Route path="**" component={Feed} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
