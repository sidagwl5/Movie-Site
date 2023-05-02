import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Content from "../components/Content";
import Section from "../components/Section";
import * as func from "../scripts/Functions";

const MainPage = () => {
  useEffect(() => {
    func.setAuthListener();
  }, []);

  return (
    <div className="mainpage-main1">
      <div className="mainpage-submain1">
        <Section />
        <Content />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default observer(MainPage);
