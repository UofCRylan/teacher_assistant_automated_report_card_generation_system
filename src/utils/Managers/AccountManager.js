import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

let instance;

class AccountManager {
  #user;
  // user_id;
  userToken;

  constructor() {
    if (instance) {
      throw new Error("An account manager has already been initialized");
    }
    instance = this;

    const accessToken = cookies.get("user");

    if (accessToken) {
      this.#user = accessToken;
      this.userToken = accessToken;
    }
  }

  async auth(email, password) {
    const data = {
      email: email,
      password: password,
    };

    if (!email || email === null) {
      return {
        status: 400,
        message: "Enter email address",
      };
    }

    if (!password || password === null) {
      return {
        status: 400,
        message: "Enter password",
      };
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/auth/`,
        data
      );

      const accessToken = response.data.access;
      var date = new Date();
      date.setDate(date.getDate() + 90);

      this.#user = accessToken;
      this.accessToken = accessToken;
      cookies.set("user", accessToken, {
        expires: date,
        maxAge: 90 * 86400,
      });

      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  isAuthenticated(value) {
    if (!value) {
      return this.#user !== null && this.#user !== undefined;
    }

    this.#user = value;
    return true;
  }

  async getUserInfo() {
    if (this.#user) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/me`, {
          headers: { Authorization: `Bearer ${this.#user}` },
        });

        return response;
      } catch (error) {
        return {
          message: error.response.data.error,
          status: error.status,
        };
      }
    }
    return undefined;
  }

  logout = () => {
    cookies.remove("user");
    this.#user = undefined;
    this.accessToken = undefined;
  };

  // Callback to make sure user is signed in otherwise returns 400 error
  requireAuth(callback) {
    return (...args) => {
      let account = accountManager.isAuthenticated();

      if (!account) {
        return {
          status: 401,
          message: "User not signed in",
        };
      }

      return callback.apply(this, args);
    };
  }

  getInstance() {
    return this;
  }
}

const accountManager = new AccountManager();
export default accountManager;
