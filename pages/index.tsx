import React, { useState } from "react";
import Button from "@/src/components/ui/Button/Button";
import Text from "@/src/components/ui/Input/Text";
import VSpace from "@/src/components/ui/Space/VSpace";
import Alert from "@/src/components/ui/Alerts/Alert";
import "@/src/styles/general/pages/signin.css";
import accountManager from "@/src/utils/Managers/AccountManager";
import { useRouter } from "next/router";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const router = useRouter();

  const handleLogin = async () => {
    const result = await accountManager.auth(email, password);
    console.log(result);

    if (result.status === 200) {
      router.push("/student");
    }

    if (result?.status !== 200) {
      setError(result);
    }
  };

  return (
    <div id="container">
      <div id="sign-in-container">
        <h1>Sign In Page</h1>
        {error.status && error.status !== 200 && (
          <>
            <Alert type="error" message={error.message} width={"100%"} />
            <VSpace space={34} />
          </>
        )}

        <Text
          label="Email address"
          value={email}
          handleChange={(value) => setEmail(value)}
          type="text"
          placeholder="example@domain.com"
          className="form-input"
        />
        <VSpace space={15} />
        <Text
          type="password"
          value={password}
          handleChange={(value) => setPassword(value)}
          label="Password"
          className="form-input"
        />
        <VSpace space={40} />
        <Button
          label="Sign In"
          className="form-button"
          onClick={() => handleLogin()}
        />
      </div>
    </div>
  );
};

export default Home;
