import axios from "axios";
import auth0Client from "../../utils/Auth";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://backend-service:9000/api/";

export function loadArticles() {
  return dispatch => {
    axios
      .get(`${url}articles`, {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      })
      .then(res => {
        dispatch({ type: "LOAD_ARTICLES", articles: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export async function getUser(_id) {
  try {
    const res = await axios.get(`${url}user/${_id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export function getUserProfile(_id) {
  return dispatch => {
    axios
      .get(`${url}user/profile/${_id}`, {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      })
      .then(res => {
        dispatch({ type: "SET_PROFILE", profile: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getArticle(article_id) {
  return dispatch => {
    axios
      .get(`${url}article/${article_id}`, {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      })
      .then(res => {
        dispatch({ type: "VIEW_ARTICLE", article: res.data });
      })
      .catch(err => console.log(err));
  };
}

export function clap(article_id) {
  return dispatch => {
    axios
      .post(
        `${url}article/clap`,
        { article_id },
        { headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` } }
      )
      .then(res => {
        dispatch({ type: "CLAP_ARTICLE" });
      })
      .catch(err => console.log(err));
  };
}

export function follow(id, user_id) {
  return dispatch => {
    axios
      .post(
        `${url}user/follow`,
        { id, user_id },
        { headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` } }
      )
      .then(res => {
        dispatch({ type: "FOLLOW_USER", user_id });
      })
      .catch(err => console.log(err));
  };
}

export function signInUser(user_data) {
  return dispatch => {
    axios
      .post(`${url}/user`, user_data, {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      })
      .then(res => {
        let user = res.data;
        localStorage.setItem("Auth", JSON.stringify(user));
        dispatch({ type: "SET_USER", user });
      })
      .catch(err => console.log(err));
  };
}

export function toggleClose() {
  return dispatch => {
    dispatch({ type: "TOGGLE_MODAL", modalMode: false });
  };
}
export function toggleOpen() {
  return dispatch => {
    dispatch({ type: "TOGGLE_MODAL", modalMode: true });
  };
}
