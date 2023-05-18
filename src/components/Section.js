import { observer } from "mobx-react";
import React from "react";
import store from "./Store";

const Section = () => {
  return (
    <div data-aos="fade-right" className="section-main1">
      {store.user ? (
        <div className="section-submain1" />
      ) : (
        <div className="section-submain2">
          <h1 style={{ marginLeft: "15px", marginBottom: "20px" }}>
            Welcome to Moviemania
          </h1>
        </div>
      )}
    </div>
  );
};

export default observer(Section);
