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

    const stateСolor = feedBag.available
        ? selected
            ? hover
                ? "#E52E7A"
                : "#D91667"
            : hover
            ? "#2EA8E6"
            : "#1698D9"
        : "#b3b3b3";

    return (
        <FeedBagWrapper>
            <FeedBagContent
                onClick={onFeedBagClick}
                onMouseEnter={setHoverOn}
                onMouseLeave={setHoverOff}
                backgroundColor={stateСolor}
                available={feedBag.available}
            >
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
                <FeedBagWeightContainer backgroundColor={stateСolor}>
                    <FeedBagWeightValue>{feedBag.weight}</FeedBagWeightValue>
                    <FeedBagWeightUnits>кг</FeedBagWeightUnits>
                </FeedBagWeightContainer>
                {!feedBag.available && <FeedBagNotAvailableOverflow />}
            </FeedBagContent>
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

const feedBagBevelWidth = "64px";
const feedBagBorderWidth = "4px";
const feedBagBorderRadius = "16px";

const gradientLength = parseInt(feedBagBorderWidth);
const center = (parseInt(feedBagBevelWidth) / 2) * Math.sqrt(2);
const offset = gradientLength * (1 - Math.sqrt(0.5));
const gradientStartPosition = center - offset;

const FeedBagWrapper = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    position: relative;
    width: 95%;
    margin-bottom: 2rem;
    @media screen and (min-width: 640px) {
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

const FeedBagContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: ${feedBagBorderRadius};
    pointer-events: ${(props) => (props.available ? "auto" : "none")};

    background-image: linear-gradient(
            to left,
            ${(props) => props.backgroundColor},
            ${(props) => props.backgroundColor}
        ),
        linear-gradient(
            to top,
            ${(props) => props.backgroundColor},
            ${(props) => props.backgroundColor}
        ),
        linear-gradient(
            135deg,
            transparent calc(${gradientStartPosition}px),
            ${(props) => props.backgroundColor} calc(${gradientStartPosition}px),
            ${(props) => props.backgroundColor}
                calc(${gradientStartPosition}px + ${gradientLength}px),
            #ffffff calc(${gradientStartPosition}px + ${gradientLength}px)
        ),
        linear-gradient(to bottom, #ffffff, #ffffff),
        linear-gradient(to top, #ffffff, #ffffff);
    background-position: top right, bottom left, top left, top right,
        bottom left;
    background-size: calc(100% - ${feedBagBevelWidth}) ${feedBagBorderWidth},
        ${feedBagBorderWidth} calc(100% - ${feedBagBevelWidth}),
        ${feedBagBevelWidth} ${feedBagBevelWidth},
        calc(100% - ${feedBagBevelWidth} + 1px) 100%,
        100% calc(100% - ${feedBagBevelWidth} + 1px); /* (+ 1px) ie11 fix */
    background-repeat: no-repeat;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        width: ${feedBagBorderRadius};
        border-radius: ${feedBagBorderRadius};
        border: ${feedBagBorderWidth} solid ${(props) => props.backgroundColor};
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: transparent;
        height: ${feedBagBorderRadius};
        border-radius: ${feedBagBorderRadius};
        border: ${feedBagBorderWidth} solid ${(props) => props.backgroundColor};
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
`;

const FeedBagNotAvailableOverflow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.5;
    background-image: linear-gradient(
            135deg,
            transparent ${gradientStartPosition}px,
            #ffffff ${gradientStartPosition}px
        ),
        linear-gradient(to bottom, #ffffff, #ffffff),
        linear-gradient(to top, #ffffff, #ffffff);
    background-position: top left, top right, bottom left;
    background-size: ${feedBagBevelWidth} ${feedBagBevelWidth},
        calc(100% - ${feedBagBevelWidth} + 1px) 100%,
        100% calc(100% - ${feedBagBevelWidth} + 1px); /* (+ 1px) ie11 fix */
    background-repeat: no-repeat;
    z-index: 1;
`;

const FeedBagInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: ${feedBagBevelWidth};
`;

const FeedBagHeadline = styled.p`
    font-size: 16px;
    line-height: 19px;
    color: #666666;
    margin-top: 21px;
`;

const FeedBagName = styled.h2`
    font-weight: bold;
    font-size: 38px;
    line-height: 46px;
    margin-top: 5px;
    @media screen and (min-width: 640px) {
        font-size: 48px;
        line-height: 56px;
    }
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
    margin-left: ${feedBagBorderWidth};
    width: 100%;
    object-fit: cover;
`;

const FeedBagWeightContainer = styled.div`
    background-color: ${(props) => props.backgroundColor};
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
    border-bottom: 1px dashed #1698d9;
    cursor: pointer;
    color: #1698d9;
    &:hover {
        color: #2ea8e6;
    }
`;

// const a = parseInt(feedBagBevelWidth);
// const b = parseInt(feedBagBorderWidth);

// Вариант 1 - идеальное соединение
// const center = a / 2 * Math.sqrt(2);
// const gradientLength = b * Math.sqrt(0.5);

// Вариант 2 (Скос с такой же шириной, как у рамки)
// const center = a / 2 * Math.sqrt(2);
// const offset = b * (1 - Math.sqrt(0.5));
// const gradientStartPosition = center - offset;
// const gradientLength = b;
