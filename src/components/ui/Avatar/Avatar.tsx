import React from "react";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

interface AvatarProps {
  fullName: string;
  size?: "xl" | "l" | "m" | "s" | "xs";
}

const Avatar: React.FC<AvatarProps> = ({ fullName, size = "m" }) => {
  const avatarSize = (() => {
    switch (size) {
      case "xl":
        return 96;
      case "l":
        return 80;
      case "m":
        return 64;
      case "s":
        return 48;
      case "xs":
        return 32;
      default:
        return 64;
    }
  })();

  const avatar = createAvatar(initials, {
    seed: fullName,
    radius: 10,
    size: avatarSize,
  }).toDataUri();

  return <img src={avatar} alt="Avatar" />;
};

export default Avatar;
