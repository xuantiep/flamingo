import * as React from "react";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import moment from "moment";
import Head from "next/head";

import * as globals from "../globals";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";
import minisearchIcon from "./minisearch.svg";

let expandedHeight = "106px";
let collapsedHeight = "60px";



export default class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: true,
      searchExpanded: false,
      // darkMode: false
    };
    this.MastheadCard = React.createRef();
    this.SearchBar = React.createRef();
    this.Logo = React.createRef();

    this.isScrolled = this.isScrolled.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.collapseMenu = this.collapseMenu.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.isScrolled);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrolled);
  }

  isScrolled() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.collapseMenu();
    } else if (
      (document.body.scrollTop <= 0 ||
        document.documentElement.scrollTop <= 0) &&
      !this.state.menuExpanded
    ) {
      this.expandMenu();
    }
  }

  expandMenu() {
    const block = this.MastheadCard.current;
    const logo = this.Logo.current;
    if (!this.state.menuExpanded) {
      block.style.height = expandedHeight;
      logo.style.height = "60px";
      this.state.menuExpanded = true;
    }
  }

  collapseMenu() {
    const block = this.MastheadCard.current;
    const logo = this.Logo.current;
    if (this.state.menuExpanded) {
      block.style.height = collapsedHeight;
      logo.style.height = "48px";

      this.state.menuExpanded = false;
    }
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  render() {
    let date = moment();
    let today = date.format("dddd, MMM D, YYYY");
    let renderedCategories = [];
    if (this.props.categories != null) {
      for (let i in this.props.categories) {
        renderedCategories.push(
          <a
            key={i}
            href={this.props.categories[i].as}
            css={css`
              display: table-cell;
              text-align: center;
              padding: 8px 4px;
              font-family: ${globals.menuFont};
              font-size: 13px;
              font-weight: bold;
              text-decoration: none;
              text-transform: uppercase;
              color: ${this.props.darkmode ? "#ddd" : "#000"};
              white-space: nowrap;
              &:hover {
                text-decoration: underline;
              }

              &.isSticky {
                background-color: red;
              }
            `}
          >
            {this.props.categories[i].name}
          </a>
        );
      }
    }
    return (
      <div
        ref={this.MastheadCard}
        css={css`
          background: ${this.props.darkmode ? "#222" : "#fff"};
          color: ${this.props.darkmode ? "#ddd" : "#000"};
          box-shadow: ${globals.cardShadow};
          overflow: hidden;
          height: ${expandedHeight};
          transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
          position: sticky;
          top: 0;
          z-index: 10;
          margin: 6px;
        `}
      >
        <div
          css={css`
            padding: 6px 18px;
            display: table;
            table-layout: fixed;
            width: 100%;
            vertical-align: middle;
          `}
        >
          <div
            css={css`
              display: table-cell;
              text-align: left;
              white-space: nowrap;
              vertical-align: middle;
              @media (max-width: 900px) {
                display: none;
              }
              .switch {
                position: relative;
                display: inline-block;
                margin-top: 20px;
                margin-left: 20px;
                width: 30px;
                height: 17px;
              }
              .switch input {
                opacity: 0;
                width: 0;
                height: 0;
              }

              /* The slider */
              .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
              }

              .slider:before {
                position: absolute;
                content: "";
                height: 13px;
                width: 13px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
              }

              input:checked + .slider {
                background-color: #2196F3;
              }

              input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
              }

              input:checked + .slider:before {
                -webkit-transform: translateX(13px);
                -ms-transform: translateX(13px);
                transform: translateX(13px);
              }

              /* Rounded sliders */
              .slider.round {
                border-radius: 17px;
              }

              .slider.round:before {
                border-radius: 50%;
              }
            `}
          >
            <h2
              css={css`
                white-space: nowrap;
                display: inline-block;
                margin: 0;
                font-family: ${globals.headlineFont};
                font-style: normal;
                font-weight: 550;
                font-size: 16px;
              `}
            >
              {today}
            </h2>
            <label class="switch">
              <input type="checkbox" checked={this.props.darkmode} onChange={(e)=>this.props.onToggle(e)}/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div
            css={css`
              display: table-cell;
              text-align: center;
              white-space: nowrap;
            `}
          >
            <a
              ref={this.Logo}
              href="/"
              css={css`
                display: inline-block;
                vertical-align: middle;
                height: 60px;
                padding: 8px 0;
                transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
                @media (max-width: 600px) {
                  height: 24px;
                }
              `}
            >
              <img
                src={
                  date.date() == 1 && date.month() == 3
                    ? require("./prankd.svg")
                    : logo
                }
                css={css`
                  display: inline-block;
                  height: 100%;
                `}
              ></img>
              {date.date() == 1 && date.month() == 3 && (
                <>
                  <Head>
                    <link
                      href="https://wp.dailybruin.com/wp-content/themes/caeruleum/css/dbcomic.ttf"
                      rel="stylesheet"
                    />
                  </Head>
                  <Global
                    styles={css`
                      * {
                        font-family: "Comic Sans MS", sans-serif !important;
                      }
                    `}
                  ></Global>
                </>
              )}
            </a>
          </div>
          <div
            css={css`
              display: table-cell;
              text-align: right;
              vertical-align: middle;
              white-space: nowrap;
            `}
          >
            <div
              css={css`
                display: inline-block;
                position: relative;
                transition: all 500ms;
                height: 36px;
              `}
            >
              <div
                css={css`
                  display: inline-block;
                  vertical-align: middle;
                  margin-top: 2px;
                  margin-right: 10px;

                  & > a {
                    padding: 0 4px;
                    font-family: ${globals.menuFont};
                    font-weight: bold;
                    text-transform: uppercase;
                    line-height: 34px;
                    font-size: 14px;
                    color: ${this.props.darkmode ? "#ddd" : "#000"};
                    display: inline-block;
                    vertical-align: middle;
                    height: 36px;
                  }

                  & > a:hover {
                    text-decoration: underline;
                  }

                  @media (max-width: 650px) {
                    display: none;
                  }
                `}
              >
                <div
                  id="social-media"
                  css={css`
                    display: inline-block;

                    & a {
                      margin: 0 6px;
                      display: inline-block;
                      vertical-align: middle;
                    }
                    & a img {
                      display: block;
                      height: 14px;
                    }

                    & a:hover img {
                      fill: ${globals.DBblue};
                    }
                    
                  `}
                >
                  
                  <a
                    href="https://www.facebook.com/dailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <img src={require("./facebook.svg")} css={css`
                      ${this. props.darkmode ? "filter: invert(100%);" : ""};
                `   } />
                  </a>
                  <a
                    href="https://www.twitter.com/dailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <img src={require("./twitter.svg")} css={css`
                      ${this.props.darkmode ? "filter: invert(100%);" : ""};
                `   } />
                  </a>
                  <a
                    href="https://www.instagram.com/dailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <img src={require("./instagram.svg")} css={css`
                      ${this. props.darkmode ? "filter: invert(100%);" : ""};
                `   } />
                  </a>
                  <a
                    href="http://eepurl.com/cFEiZX"
                    target="_blank"
                    rel="noopener"
                  >
                    <img src={require("./mail.svg")} css={css`
                      ${this. props.darkmode ? "filter: invert(100%);" : ""};
                `   } />
                  </a>
                  <a
                    href="https://www.overlooked.com"
                    target="_blank"
                    rel="noopener"
                  >
                    <img src={require("./overlooked.png")} css={css`
                      ${this. props.darkmode ? "filter: invert(100%);" : ""};
                `   } />
                  </a>
                  <a
                    href="https://www.youtube.com/user/ucladailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <img src={require("./youtube.png")} css={css`
                      ${this. props.darkmode ? "filter: invert(100%);" : ""};
                `   } />
                  </a>
                </div>
                <a href="/advertise">Advertise</a>
                <a href="https://giving.ucla.edu/campaign/?&amount=100&OrgType=C&OrgNum=11300&fund=31601O&_ga=2.101555268.497205227.1521136411-359345519.1518723170">
                  Donate
                </a>
                <a href="/submit">Submit</a>
              </div>
              <div
                css={css`
                  display: inline-block;
                  position: relative;
                  transition: all 500ms;
                  height: 36px;
                  width: 36px;
                  vertical-align: middle;
                `}
              >
                <form method="get" action="/search">
                  <input
                    ref={this.SearchBar}
                    id="SearchBar"
                    type="text"
                    name="q"
                    placeholder="search"
                    pattern="\S+.*"
                    css={css`
                      position: absolute;
                      right: 0;
                      z-index: 10;
                      height: 36px;
                      background-color: #000;
                      color: #000;
                      resize: none;
                      transition: width 500ms cubic-bezier(0.25, 0.8, 0.25, 1),
                        color 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
                      width: 0;
                      padding: 0;
                      border: none;
                      outline: none;
                      line-height: 36px;
                      font-size: 18px;
                      font-family: ${globals.menuFont};
                      font-weight: bold;
                      &:focus {
                        width: 250px;
                        padding: 0 36px 0 6px;
                        color: #fff;
                      }
                      &:focus + input {
                        display: block;
                      }
                      &:focus + input + #Masthead__SearchIconBox {
                        background-color: #000;
                      }
                    `}
                  ></input>
                  <input
                    type="submit"
                    value=""
                    css={css`
                      position: absolute;
                      z-index: 12;
                      width: 36px;
                      height: 36px;
                      right: 0;
                      top: 0;
                      border: none;
                      padding: 6px;
                      cursor: pointer;
                      color: #fff;
                      outline: none;
                      display: none;
                      background-color: #000;
                      background-image: url(${minisearchIcon});
                      background-repeat: no-repeat;
                      background-size: 24px;
                      background-position: 6px;
                      &:hover {
                        display: block;
                      }
                      &:hover ~ input {
                        width: 250px;
                        padding: 0 36px 0 6px;
                        color: #fff;
                      }
                      &:focus {
                        outline: none;
                        display: block;
                      }
                    `}
                  />
                  <div
                    css={css`
                      position: absolute;
                      z-index: 11;
                      right: 0;
                      top: 0;
                      border: none;
                      padding: 0;
                      cursor: pointer;
                      background-color: transparent;
                      outline: none;
                      &:focus {
                        outline: none;
                      }
                    `}
                    onClick={this.expandSearch}
                  >
                    <img
                      id="Masthead__SearchIconBox"
                      css={css`
                        display: inline-block;
                        vertical-align: middle;
                        transition: all 200ms;
                        transition-delay: 100ms;
                        width: 36px;
                        height: 36px;
                        ${this. props.darkmode ? "filter: invert(1);" : ""};
                        
                      `}
                      src={searchIcon}
                    ></img>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          css={css`
            padding: 0 12px;
          `}
        >
          <div
            css={css`
              width: 100%;
              height: 1px;
              background-color: #000;
            `}
          ></div>
        </div>
        <div
          css={css`
            background: ${this.props.darkmode ? "#222" : "#fff"};
            color: ${this.props.darkmode ? "#ddd" : "#000"};
            overflow-x: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          <div
            css={css`
              padding: 0 12px;
              display: table;
              width: 100%;
              box-sizing: border-box;
            `}
          >
            {renderedCategories}
          </div>
        </div>
      </div>
    );
  }
}
