import React, { useState } from "react";
import styled from "styled-components";
import catImage from "./assets/cat.png";

export default function FeedBag({ feedBag }) {
    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    const onBuyClick = () => {
        setHover(false);
        setSelected(true);
    };
    const onFeedBagClick = () => {
        setHover(selected);
        setSelected(!selected);
    };

    const setHoverOn = () => setHover(true);
    const setHoverOff = () => setHover(false);

    return (
        <FeedBagWrapper>
            <FeedBagContainer
                onClick={onFeedBagClick}
                onMouseEnter={setHoverOn}
                onMouseLeave={setHoverOff}
                selected={selected}
                hover={hover}
                available={feedBag.available}
            >
                <FeedBagContent>
                    <FeedBagInfo>
                        <FeedBagHeadline>
                            {(selected && hover && "Котэ не одобряет?") ||
                                "Сказочное заморское яство"}
                        </FeedBagHeadline>
                        <FeedBagName>Нямушка</FeedBagName>
                        <FeedBagTaste>{feedBag.taste}</FeedBagTaste>
                        <FeedBagCaptionList>
                            {feedBag.captionList.map((captionItem, index) => (
                                <li key={index}>{captionItem}</li>
                            ))}
                        </FeedBagCaptionList>
                    </FeedBagInfo>
                    <FeedBagImage src={catImage} alt="cat" />
                    <FeedBagWeightContainer
                        selected={selected}
                        hover={hover}
                        available={feedBag.available}
                    >
                        <FeedBagWeightValue>
                            {feedBag.weight}
                        </FeedBagWeightValue>
                        <FeedBagWeightUnits>кг</FeedBagWeightUnits>
                    </FeedBagWeightContainer>
                </FeedBagContent>
            </FeedBagContainer>
            <FeedBagUnderline available={feedBag.available}>
                {feedBag.available ? (
                    selected ? (
                        feedBag.underLine
                    ) : (
                        <>
                            {"Чего сидишь? Порадуй котэ, "}
                            <FeedBagBuyButton
                                onClick={onBuyClick}
                                onMouseEnter={setHoverOn}
                                onMouseLeave={setHoverOff}
                                selected={selected}
                                hover={hover}
                            >
                                купи.
                            </FeedBagBuyButton>
                        </>
                    )
                ) : (
                    `Печалька, ${feedBag.taste} закончился.`
                )}
            </FeedBagUnderline>
        </FeedBagWrapper>
    );
}

const feedBagSlashTopWidth = "16%";
const feedBagSlashLeftWidth = "10%";
const feedBagBorderWidth = 4;
const feedBagBorderRaduis = 16;

const FeedBagWrapper = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;

    width: 95%;
    margin-bottom: 2rem;
    @media screen and (min-width: 576px) {
        width: 45%;
        &:last-child {
            margin-bottom: 0;
        }
    }
    @media screen and (min-width: 1200px) {
        width: 27%;
        margin-bottom: 0;
    }
`;

const FeedBagContainer = styled.div`
    flex-grow: 1;
    pointer-events: ${(props) => (props.available ? "auto" : "none")};
    background-color: ${(props) =>
        props.available
            ? props.selected
                ? props.hover
                    ? "#E52E7A"
                    : "#D91667"
                : props.hover
                ? "#2EA8E6"
                : "#1698D9"
            : "#b3b3b3"};
    transition: background-color 0.3s;
    padding: ${feedBagBorderWidth}px;
    border-radius: ${feedBagBorderRaduis + feedBagBorderWidth}px;
    clip-path: polygon(
        ${feedBagSlashTopWidth} 0,
        100% 0,
        100% 100%,
        0 100%,
        0 ${feedBagSlashLeftWidth}
    );
    position: relative;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: ${(props) => (props.available ? "none" : "block")};
        z-index: 1;
        background-color: #f2f2f2;
        border-radius: ${feedBagBorderRaduis + feedBagBorderWidth}px;
        opacity: 0.4;
    }
`;

const FeedBagContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;
    border-radius: ${feedBagBorderRaduis}px;
    position: relative;
    overflow: hidden;
    clip-path: polygon(
        ${feedBagSlashTopWidth} 0,
        100% 0,
        100% 100%,
        0 100%,
        0 ${feedBagSlashLeftWidth}
    );
`;

const FeedBagInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: ${feedBagSlashTopWidth};
`;

const FeedBagHeadline = styled.p`
    font-size: 16px;
    line-height: 19px;
    color: #666666;
    margin-top: 21px;
`;

const FeedBagName = styled.h2`
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    margin-top: 5px;
`;

const FeedBagTaste = styled.h3`
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
`;

const FeedBagCaptionList = styled.ul`
    list-style-type: none;
    font-size: 14px;
    line-height: 16px;
    color: #666666;
    margin-top: 15px;
`;

const FeedBagImage = styled.img`
    margin-top: 33px;
    width: 100%;
    object-fit: cover;
`;

const FeedBagWeightContainer = styled.div`
    position: absolute;
    right: 16px;
    bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 80px;
    height: 80px;
    padding-bottom: 8px;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    background-color: ${(props) =>
        props.available
            ? props.selected
                ? props.hover
                    ? "#E52E7A"
                    : "#D91667"
                : props.hover
                ? "#2EA8E6"
                : "#1698D9"
            : "#b3b3b3"};
    transition: background-color 0.3s;
`;

const FeedBagWeightValue = styled.p`
    font-size: 42px;
`;

const FeedBagWeightUnits = styled.p`
    font-size: 18px;
`;

const FeedBagUnderline = styled.p`
    font-size: 13px;
    line-height: 15px;
    color: ${(props) => (props.available ? "#ffffff" : "#ffff66")};
    text-align: center;
    padding-top: 14px;
`;

const FeedBagBuyButton = styled.span`
    color: ${(props) =>
        props.selected
            ? props.hover
                ? "#E52E7A"
                : "#D91667"
            : props.hover
            ? "#2EA8E6"
            : "#1698D9"};
    transition: color 0.3s;
    border-bottom: 1px dashed #1698d9;
    cursor: pointer;
`;
