import React from "react";
import Button from "@/src/components/ui/Button/Button";
import Text from "@/src/components/ui/Input/Text";
import VSpace from "@/src/components/ui/Space/VSpace";
import Alert from "@/src/components/ui/Alerts/Alert";
import "@/src/styles/general/pages/signin.css";

const Home = () => {
  return (
    <div id="container">
      <div id="sign-in-container">
        <h1>Sign In Page</h1>
        <Alert type="error" message="Wrong email address" />
        <Text
          label="Email address"
          type="text"
          placeholder="example@domain.com"
          className="form-input"
        />
        <VSpace space={15} />
        <Text type="password" label="Password" className="form-input" />
        <VSpace space={40} />
        <Button
          label="Sign In"
          className="form-button"
          onClick={() => console.log("Signing in...")}
        />
      </div>
    </div>
  );
};

export default Home;
