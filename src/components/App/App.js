import React from "react";
import "./fonts/fonts.css";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import backgroundImage from "./assets/background-image.png";
import FeedBag from "../FeedBag";
import data from "./data.json";

export default function App() {
    return (
        <AppContainer>
            <GlobalStyles />
            <AppHeadline>Ты сегодня покормил кота?</AppHeadline>
            <FeedBags>
                {data.feedBags.map((feedBag) => (
                    <FeedBag feedBag={feedBag} key={feedBag.id} />
                ))}
            </FeedBags>
        </AppContainer>
    );
}

const AppContainer = styled.div.attrs((props) => ({
    style: {
        background: `linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0) 49.88%,
            rgba(0, 0, 0, 0.5) 100%
        ),
        url(${backgroundImage})`,
    },
}))`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const AppHeadline = styled.h1`
    font-family: "Exo2.0";
    font-weight: 100;
    font-size: 36px;
    line-height: 44px;
    color: #ffffff;
    text-shadow: 0px 1px 1px #000000;
    margin-bottom: 25px;
    text-align: center;
`;

const FeedBags = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    /* ie11 fix */
    justify-content: space-around;
    @supports (justify-content: space-evenly) {
        justify-content: space-evenly;
    }
`;
