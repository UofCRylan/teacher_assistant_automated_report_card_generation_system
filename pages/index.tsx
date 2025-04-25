import React, { useState } from "react";
import Button from "@/src/components/ui/Button/Button";
import Text from "@/src/components/ui/Input/Text";
import VSpace from "@/src/components/ui/Space/VSpace";
import Alert from "@/src/components/ui/Alerts/Alert";
import "@/src/styles/general/pages/signin.css";
import accountManager from "@/src/utils/Managers/AccountManager";
import { useRouter } from "next/router";
import Modal from "@/src/components/ui/Modal/Modal";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const result = await accountManager.auth(email, password);

    if (result.status === 200) {
      router.push(`/${result.data.user_type}`);
    }

    if (result?.status !== 200) {
      setError(result);
    }
  };

  return (
    <div id="container">
      <div id="sign-in-container">
        <img
          src="/assets/images/logo.png"
          width={230}
          height={80}
          alt="Logo"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <VSpace space={30} />
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
        <a href="#" onClick={() => setShowModal(!showModal)}>
          Attributions
        </a>
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          width={600}
          height={700}
          borderRadius={15}
        >
          <h3>This project was made possible using the following:</h3>
          <ul>
            <li>React remix icons</li>
            <li>React Toastify (For message alerts)</li>
          </ul>
          <span>Images</span>
          <ul>
            <li>
              CBE Logo
              (https://en.wikipedia.org/wiki/File:Calgary_Board_of_Education_Logo.svg)
            </li>
            <li>
              Login page background
              (https://en.wikipedia.org/wiki/File:Calgary_Board_of_Education_Logo.svg)
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/plus-sign"
                title="plus sign icons"
              >
                Plus sign icon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/pencil"
                title="pencil icons"
              >
                Pencil icon
              </a>
            </li>
            <li>
              Homeroom Icon
              (https://www.flaticon.com/free-icon/blackboard_717874)
            </li>
            <li>
              Science Icon{" "}
              <a
                href="https://www.flaticon.com/free-icons/science"
                title="science icons"
              >
                Science icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              Gym Icon (https://www.flaticon.com/free-icon/dumbbell_563777)
            </li>
            <li>
              Social Studies Icon (https://www.freepik.com/icon/globe_4898410)
            </li>
            <li>
              English Icon (https://www.flaticon.com/free-icon/eng_5309804)
            </li>
            <li>Math Icon (https://www.freepik.com/icon/tools_2249539)</li>
            <li>Music Icon (https://www.freepik.com/icon/guitar_1069481)</li>
          </ul>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
