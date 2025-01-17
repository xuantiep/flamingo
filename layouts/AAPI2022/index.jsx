import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";

import storiesheader from "./storiesheader.svg";
import storiesbg from "./storiesbg.svg";
import relatedheader from "./relatedheader.svg";
import relatedbg from "./relatedbg.svg";

import storiesheadermobile from "./storiesheadermobile.svg";
import storiesbgmobile from "./storiesbgmobile.svg";
import relatedheadermobile from "./relatedheadermobile.svg";
import relatedbgmobile from "./relatedbgmobile.svg";

import DesktopLanding from "./desktop_landing.gif";
import MobileLanding from "./mobile_landing.gif";
import description from "./description.svg";
import descriptionmobile from "./descriptionmobile.svg";
import Header from "./Header";
import AAPIFooter from "./Footer";

export default class AAPILayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPosts = [];
    for (let i in this.props.posts) {
      renderedPosts.push(
        <a
          key={i}
          css={css`
            width: 100%;
            height: 13vh;
            margin: 3% auto;
            padding: 2% 3%;
            background-color: #fff;
            text-align: center;
            color: black;
            display: table;
            font-size: min(2.5vw, 14px);
            &:hover {
              text-decoration: none;
            }
            @media all and (max-width: 800px) {
              font-size: 14px;
              margin: 5% auto;
            }
          `}
          href={this.props.posts[i].link}
        >
          <div
            src={
              this.props.posts[i]._embedded["wp:featuredmedia"] != undefined
                ? this.props.posts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : null
            }
            css={css`
              padding: 2%;
              width: 24%;
              height: 100%;
              display: table-cell;
              background-image: url(${this.props.posts[i]._embedded[
                "wp:featuredmedia"
              ] != undefined
                ? this.props.posts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : ""});
              background-size: cover;
              background-position: center;
            `}
          />
          <div
            css={css`
              margin: 2.5% 3.5%;
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding-left: 5%;
            `}
          >
            <div
              css={css`
                font-family: "Noto Serif", ${globals.headlineFont};
                font-weight: 700;
              `}
              dangerouslySetInnerHTML={{
                __html: this.props.posts[i].title.rendered
              }}
            />
            <div
              css={css`
                font-family: ${globals.menuFont};
                text-transform: uppercase;
              `}
              dangerouslySetInnerHTML={{
                __html: `By ${this.props.posts[i].coauthors[0].display_name}`
              }}
            />
          </div>
        </a>
      );
    }

    let relatedPosts = [];
    for (let i in this.props.relatedPosts) {
      relatedPosts.push(
        <a
          key={i}
          css={css`
            width: 100%;
            height: 15vh;
            margin: 5% auto;
            padding: 2% 3%;
            background-color: #fff;
            text-align: center;
            color: black;
            display: table;
            font-size: min(3vw, 16px);
            &:hover {
              text-decoration: none;
            }
            @media all and (max-width: 800px) {
              font-size: 14px;
              height: 13vh;
              margin: 5% auto;
            }
          `}
          href={this.props.relatedPosts[i].link}
        >
          <div
            src={
              this.props.relatedPosts[i]._embedded["wp:featuredmedia"] !=
              undefined
                ? this.props.relatedPosts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : null
            }
            css={css`
              padding: 2%;
              width: 24%;
              height: 100%;
              display: table-cell;
              background-image: url(${this.props.relatedPosts[i]._embedded[
                "wp:featuredmedia"
              ] != undefined
                ? this.props.relatedPosts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : ""});
              background-size: cover;
              background-position: center;
            `}
          />
          <div
            css={css`
              margin: 2.5% 3.5%;
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding-left: 5%;
            `}
          >
            <div
              css={css`
                font-family: "Noto Serif", ${globals.headlineFont};
                font-weight: 700;
              `}
              dangerouslySetInnerHTML={{
                __html: this.props.relatedPosts[i].title.rendered
              }}
            />
            <div
              css={css`
                font-family: ${globals.menuFont};
                text-transform: uppercase;
              `}
              dangerouslySetInnerHTML={{
                __html: `By ${this.props.relatedPosts[i].coauthors[0].display_name}`
              }}
            />
          </div>
        </a>
      );
    }

    return (
      <>
        <div
          css={css`
            display: flex;
            /* height: 100vh; */
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <Header></Header>
          

          <img
            src={DesktopLanding}
            css={css`
              /* padding-top: 7%; */
              margin: auto;
              width: 100%;
              @media all and (max-width: 800px) {
                display: none;
              }
            `}
          />
          <img
            src={MobileLanding}
            css={css`
              width: 100vw;
              display: none;
              @media all and (max-width: 800px) {
                display: inline-block;
              }
            `}
          />

          <img
            src={description}
            css={css`
              //padding-top: 7%;
              margin: auto;
              width: 100%;
              @media all and (max-width: 800px) {
                display: none;
              }
            `}
          />
          <img
            src={descriptionmobile}
            css={css`
              width: 100vw;
              display: none;
              @media all and (max-width: 800px) {
                display: inline-block;
              }
            `}
          />
          {/* 
          <div
            css={css`
              background-image: url(${DescriptionBoxBg});
              background-position: center;
              background-size: cover;
              background-color: #8d91fd;
              color: #fff;
              font-family: "Noto Serif", ${globals.bodyFont};
              height: 500px;
              max-width: 100vw;
              @media (max-width: 800px) {
                background-image: url(${descriptionmobile});
                background-size: cover;
              }
            `}
          >
            <p
              css={css`
                //min-width: 600px;
                width: 60%;
                margin: auto;
                margin-top: %;
                text-align: center;
                font-size: min(2.5vw, 20px);
                @media (max-width: 800px) {
                  margin: 20% 25%;
                  
                }
                line-height: 1.5;
              `}
            >
              As we celebrate Asian American and Pacific Islander Heritage
              Month, the Daily Bruin spotlights the voices and contributions of
              the AAPI community during and beyond May. This special issue tells
              stories about advocacy groups’ fight against gentrification in
              Chinatown, features of UCLA student-athletes in the AAPI
              community, coverage of the Los Angeles Asian Pacific Film
              Festival, and more.
            </p>
          </div>*/}
        </div>
        <div
          css={css`
            background-image: linear-gradient(#8e90fd, #c08dd4, #e09cb8);
            display: inline-block;
          `}
        >
          <img
            src={storiesheader}
            css={css`
              width: 100vw;
              @media all and (max-width: 800px) {
                display: none;
              }
            `}
          />
          <img
            src={storiesheadermobile}
            css={css`
              width: 100vw;
              display: none;
              @media all and (max-width: 800px) {
                display: inline-block;
              }
            `}
          />
          <div
            css={css`
              background-image: url(${storiesbg});
              background-size: cover;
              @media all and (max-width: 800px) {
                background-image: url(${storiesbgmobile});
              }
            `}
          >
            <div
              css={css`
                padding-top: 7%;
                width: 93%;
                display: grid;
                grid-template-columns: 46% 46%;
                justify-content: space-around;
                margin: auto;
                @media all and (max-width: 800px) {
                  width: 85vw;
                  grid-template-columns: 100%;
                }
              `}
            >
              {renderedPosts}
            </div>
          </div>
          <img
            src={relatedheader}
            css={css`
              padding-top: 7%;
              margin: auto;
              width: 100%;
              @media all and (max-width: 800px) {
                display: none;
              }
            `}
          />
          <img
            src={relatedheadermobile}
            css={css`
              width: 100vw;
              display: none;
              @media all and (max-width: 800px) {
                display: inline-block;
              }
            `}
          />
          <div
            css={css`
              background-image: url(${relatedbg});
              background-size: cover;
              @media all and (max-width: 800px) {
                background-image: url(${relatedbgmobile});
              }
            `}
          >
            <div
              css={css`
                width: 55%;
                padding-top: 7%;
                padding-bottom: 7%;
                margin: auto;
                @media all and (max-width: 800px) {
                  width: 85vw;
                  grid-template-columns: 100%;
                }
              `}
            >
              {relatedPosts}
            </div>
          </div>
        </div>
        <AAPIFooter />
      </>
    );
  }
}
