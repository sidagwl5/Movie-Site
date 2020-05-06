import React, { Component } from 'react';
import store from "./Store"
import { observer } from "mobx-react"
import Header from "../components/Header";


class Section extends Component {
    render() {
        return (
            <div data-aos = "fade-right" className="section-main1">

                <Header />

                {
                    (store.isLoggedIn) ?

                        <div className="section-submain1">
                            <h1 style={{ marginBottom: "100px" }}>Welcome <span>{store.User.displayName}</span>!!</h1>
                        </div>

                        :
                        <div className="section-submain2">
                            <h1 style={{ marginLeft: "15px", marginBottom : "20px" }}>Welcome to Moviemania</h1>
                        </div>
                }

            </div>
        );
    }
}

export default observer(Section)
