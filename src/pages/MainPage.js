import React, { Component } from 'react';
import * as func from "../scripts/Functions";
import Content from '../components/Content';
import { observer } from "mobx-react";
import Section from "../components/Section";
import Footer from "../components/Footer";

class MainPage extends Component {

    componentDidMount() {

        func.setAuthListener()
    }
    render() {
        return (

            <div className="mainpage-main1">

                <div className="mainpage-submain1">
                    <Section />
                    <Content />
                    <Footer />
                </div>

            </div>

        );
    }
}

export default observer(MainPage);