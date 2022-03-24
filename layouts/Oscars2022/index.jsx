import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import header from "./image.gif";
import description from "./oscarsheader.svg"
import gradient from "./gradient.svg";
import MainSiteFooter from "../../components/MainSiteFooter";
import relatedImg from "./related.gif";
import filmmakerImg from "./filmmaker.gif";
import bruinImg from "./bruin.gif";
import background from "./oscars1.svg";
import Masthead from "../../components/Masthead";

export default class Oscars2022Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPostsFilm = [];
    let renderedPostsBruin = [];
    let renderedPostsRelated = [];
    let related = true;
    let bruin = true;
    let filmmaker = true;
    for (let i in this.props.posts) {
      let tags = this.props.posts[i].tags;
      var currentSet;
      if(tags.length > 2) {console.log(this.props.posts[i])};
      //console.log(tags);
      if (tags[0] == 24441 || tags[1] == 24441 || ((tags.length > 2) && tags[2] == 24441)) {
        if (filmmaker)
        {
          renderedPostsFilm.push(
          <img src={filmmakerImg} css={css`
            width: 100vw;
            height: 50vh;
            background-size: cover;
            display: block;`}/>
        );
        filmmaker = false;
          }
        currentSet = renderedPostsFilm;
      }
      if (tags[0] == 24494 || tags[1] == 24494 || ((tags.length > 2) && tags[2] == 24494)) {
        if (bruin) {
          renderedPostsBruin.push(
          <img src={bruinImg} css={css`
            width: 100vw;
            height: 50vh;
            background-size: cover;
            display: block;`}/>
        );
        bruin = false;}
        currentSet = renderedPostsBruin;
      }
      if (tags[0] == 24442 || tags[1] == 24442 || ((tags.length > 2) && tags[2] == 24442)) {
        if(related) {
          renderedPostsRelated.push(
          <img src={relatedImg} css={css`
            width: 100vw;
            height: 50vh;
            background-size: cover;
            display: block;`}/>
        );
        related = false;}
        currentSet = renderedPostsRelated;
      }
      currentSet.push(
        <a
          key={i}
          css={css`
            text-align: center;
            color: black;
            display: table;
            min-height: 200px;
            
            position: relative;
            margin: 20px 10px;
            font-size: 15px;
            &:hover {
              text-decoration: none;
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
              width: 37%;
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
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding-left: 10px;
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
                font-size: 12px;
              `}
              dangerouslySetInnerHTML={{
                __html: `By ${this.props.posts[i].coauthors[0].display_name}`
              }}
            />
          </div>
        </a>
      );
    }
    return (
      <div css={css`background: linear-gradient(#951200, #D4421B, #E38522); background-repeat: no-repeat;`}>
        <div
          css={css`
            display: flex;
            
            height: 100vh;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              width: 100%;
              padding: 15px;
              max-width: 700px;
              margin: auto;
              height: 400px;
            `}
            href="/"
          >
            <img
              src={header}
              css={css`
                width: 100%;
                
              `}
            />
          </div>
          </div>
          <div
            css={css `
            display: block;
            align: center;
            align-items: center;
            justify-content: center;
            padding-top: 3%;
            width: 100%;
            margin: 0 auto;
            
            `}
          >
            <img src={description}
              css={css`
              width: 100vw;
              height: 80vh;
                background-size: cover;
                display: block;
                padding-bottom: 10px;
              `}
            >
              
              
            </img>
          </div>
        
        <div
          css={css`
            margin: auto;
            width: 100%;
            
            display: block;
          `}
        >
          <div css={css` display: block; align-items: center; align: center;`}>
            <iframe width="70%" height="300"
              src="https://www.youtube.com/embed/B70cT-sumVg" 
              css={css`margin: 0 auto; display: block; `}
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
            </div>
          {renderedPostsBruin}
          {renderedPostsFilm}
          {renderedPostsRelated}
        </div>
        <MainSiteFooter></MainSiteFooter>
      </div>
    );
  }
}
