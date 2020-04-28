import PageWrapper from "../../../../layouts/PageWrapper";
import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../../../config.js";
import Head from "next/head";

import ArticleLayout from "../../../../layouts/Article";
import PhotoGalleryLayout from "../../../../layouts/PhotoGallery";
import FeatureLayout from "../../../../layouts/Feature";

class Post extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const post = await postRes.json();
    let authors = [];
    if (post[0].coauthors != undefined) {
      for (let author of post[0].coauthors) {
        const authorsRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/users/${author.id}`
        );
        authors.push(await authorsRes.json());
      }
    }
    if (post[0].acf["db_feature"] == true) {
      let feature = true;
      let tagged = [];
      if (post[0].acf["db_feature_tag"] != "") {
        const taggedRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${
            post[0].acf["db_feature_tag"]
          }`
        );
        tagged = await taggedRes.json();
      }
      return { feature, post, authors, tagged };
    }
    if (post[0].acf.gallery != undefined) {
      const photosRes = await fetch(
        `${Config.apiUrl}/wp-json/db/v1/gallery/${post[0].acf.gallery}`
      );
      const photos = await photosRes.json();
      return { post, photos, authors };
    }
    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifieds = await classifiedsRes.json();
    return { post, classifieds, authors };
  }
  componentDidMount() {
    if (
      this.props.post[0].acf["db_link"] != null &&
      this.props.post[0].acf["db_link"] != ""
    ) {
      location.replace(this.props.post[0].acf["db_link"]);
    }
  }
  render() {
    let renderedMeta = [];
    for (let meta of this.props.post[0].yoast_meta) {
      renderedMeta.push(React.createElement("meta", meta));
    }
    return (
      <>
        <Head>
          <title
            dangerouslySetInnerHTML={{
              __html: this.props.post[0].title.rendered + " - Daily Bruin"
            }}
          />
          <script
            async=""
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
          {renderedMeta}
        </Head>
        {this.props.photos != undefined && (
          <PhotoGalleryLayout
            post={this.props.post[0]}
            photos={this.props.photos}
            photographers={this.props.authors}
          />
        )}
        {this.props.feature == true && (
          <FeatureLayout
            article={this.props.post[0]}
            authors={this.props.authors}
            tagged={this.props.tagged}
          />
        )}
        {this.props.photos == undefined && this.props.feature != true && (
          <ArticleLayout
            article={this.props.post[0]}
            authors={this.props.authors}
            classifieds={this.props.classifieds.map(c => {
              return {
                category: {
                  name: c._embedded["wp:term"][1][0].name,
                  url: c._embedded["wp:term"][1][0].link
                },
                content: { name: c.content.rendered, url: c.link }
              };
            })}
          />
        )}
      </>
    );
  }
}

export default PageWrapper(Post);
