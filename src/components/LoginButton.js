import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as func from "../scripts/Functions";
import store from "./Store";
import { Popover } from "@mui/material";
import { tw } from "twind";

const MenuItem = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={tw(
        "w-full h-9 flex gap-2 text-white opacity-80 text-sm cursor-pointer items-center px-2"
      )}
    >
      <div>{icon}</div>
      {title}
    </div>
  );
};

const LoginButton = () => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return store.user ? (
    <>
      <img
        ref={anchorEl}
        onClick={setOpen.bind(this, true)}
        className={tw("w-12 h-12 rounded-full object-cover cursor-pointer")}
        src={store.user?.photoURL}
        alt="profile pic"
      />
      <Popover
        open={open}
        anchorEl={anchorEl.current}
        onClose={setOpen.bind(this, false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{
          paper: tw(
            "mt-1.5 -ml-2! rounded-md! bg-[#1b1b1b]! border border-gray-500! p-1!"
          ),
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
          title="Profile"
        />

        <hr className={tw("border-t-gray-600!")} />
        <MenuItem onClick={func.logOut} title="Logout" />
      </Popover>
    </>
  ) : (
    <button className="loginbutton-button" onClick={() => func.Login()}>
      SignIn
    </button>
  );
};

export default observer(LoginButton);
