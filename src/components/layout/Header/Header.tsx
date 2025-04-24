"use client";

import React, { useEffect, useState } from "react";
import TabBar from "../TabBar/TabBar";
import Avatar from "@/src/components/ui/Avatar/Avatar";
import "@/src/styles/general/layout/header.css";
import { RiArrowDropDownLine } from "@remixicon/react";
import ManageContainer from "./ManageContainer";
import Modal from "@/src/components/ui/Modal/Modal.js";
import { usePathname } from "next/navigation";
import Text from "../../ui/Input/Text";
import Button from "../../ui/Button/Button";
import VSpace from "../../ui/Space/VSpace";
import accountManager from "@/src/utils/Managers/AccountManager";
import { useRouter } from "next/router";

function Header() {
  const location = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [showManageContainer, setShowManageContainer] = useState(false);
  const [showMeContainer, setShowMeContainer] = useState(false);
  let userType: "a" | "s" | "t" | null = null;

  if (location) {
    if (location.startsWith("/admin")) {
      userType = "a";
    } else if (location.startsWith("/student")) {
      userType = "s";
    } else if (location.startsWith("/teacher")) {
      userType = "t";
    }
  }

  useEffect(() => {
    async function getUserInfo() {
      const result = await accountManager.getUserInfo();

      if (result) {
        console.log("Setting user as: ", result.data);

        setUser(result.data);
      }
    }
    getUserInfo();
  }, []);

  const handleManageClick = () => {
    setShowManageContainer((prevState) => !prevState);
  };

  const handleLogout = () => {
    accountManager.logout();
    router.push("/");
  };

  return (
    <div className="header">
      {user && (
        <>
          <div>
            <div>
              <img
                src="/assets/images/uoftlogo.png"
                height={60}
                width={150}
                alt="Logo"
              />
            </div>
            <TabBar userType={userType} />
            <button id="manage-section" onClick={handleManageClick}>
              <Avatar fullName={user.full_name} size="s" />
              <div id="manage-dropdown">
                <RiArrowDropDownLine size={32} />
              </div>
            </button>
          </div>
          <ManageContainer
            show={showManageContainer}
            setShow={() => setShowManageContainer(!showManageContainer)}
            fullName={user.full_name}
            handleViewInformation={() => setShowMeContainer(!showMeContainer)}
            handleLogout={() => handleLogout()}
          />
          <Modal
            show={showMeContainer}
            handleClose={() => setShowMeContainer(!showMeContainer)}
            width={500}
            height={700}
            borderRadius={10}
          >
            <div>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <Avatar size="xl" fullName={user.full_name} />
                <span style={{ fontWeight: "bold", fontSize: 30 }}>
                  {user.full_name}
                </span>
              </div>
              <VSpace space={20} />
              <div style={{ display: "flex", gap: 20 }}>
                <Text
                  label="First name"
                  value={user.first_name}
                  handleChange={() => {}}
                  type="text"
                  className="form-input"
                  disabled
                />
                <Text
                  label="Last name"
                  value={user.last_name}
                  handleChange={() => {}}
                  type="text"
                  className="form-input"
                  disabled
                />
              </div>
              <VSpace space={30} />
              <div style={{ display: "flex", gap: 20 }}>
                <Text
                  label="Email address"
                  value={user.email}
                  handleChange={() => {}}
                  type="text"
                  className="form-input"
                  disabled
                />
                <Text
                  label="Date of birth"
                  value={user.date_of_birth}
                  handleChange={() => {}}
                  type="text"
                  className="form-input"
                  disabled
                />
              </div>
              <VSpace space={60} />
              <div>
                <Button
                  label="To update this information contact admin"
                  disabled
                ></Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Header;
