import axios from "axios";

const Auth = (email, password) => {
  let result;
  const data = {
    email: email,
    password: password,
  };

  axios
    .post("http://127.0.0.1:8000/school/auth", data)
    .then((response) => {
      result = {
        status: 200,
        data: response.data,
      };
    })
    .catch((error) => {
      result = {
        error: error,
      };
    });

  return result;
};

export { Auth };
