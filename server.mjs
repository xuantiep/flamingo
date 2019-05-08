
// const express = require('express');
// const next = require('next');
// const graphqltools = require('graphql-tools');
// const apolloFetch = require('apollo-fetch');
// const ApolloServer = require('apollo-server-express');
// import HttpLink from 'apollo-link-http';
// const fetch = require('isomorphic-unfetch');
import graphqlTools from 'graphql-tools'
import apolloFetch from 'apollo-fetch';
import express from 'express';
import next from 'next';
import * as ApolloServer from 'apollo-server-express';
import HttpLink from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
// const express = require('express');
// const next = require('next');
// const ApolloServer = require('apollo-server-express');
// import HttpLink from 'apollo-link-http';
// const fetch = require('isomorphic-unfetch');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const createRemoteSchema = async (uri) => {
  // const fetcher = await createApolloFetch({uri: uri});

  const link = new HttpLink({ uri: uri, fetch });
  try {
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(link),
      link,
    });
    return schema;
  } catch (e) {
    console.log("the error message is");
    console.log(e);
  }
  // return graphqltools.makeRemoteExecutableSchema({
  //   schema: await graphqltools.introspectSchema(fetcher),
  //   fetcher
  // });
}

app.prepare().then(() => {
  createRemoteSchema('http://localhost:8080/graphql').then((schema) => {
    const apollo = new ApolloServer({schema: schema});
    console.log("did we get in here?");
    const server = express();
    apollo.applyMiddleware({ app: server })

    server.get("/post/:slug", (req, res) => {
      const actualPage = "/post";
      const queryParams = { slug: req.params.slug, apiRoute: "post" };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/page/:slug", (req, res) => {
      const actualPage = "/post";
      const queryParams = { slug: req.params.slug, apiRoute: "page" };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/category/:slug", (req, res) => {
      const actualPage = "/category";
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/_preview/:id/:wpnonce", (req, res) => {
      const actualPage = "/preview";
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
})

// app
//   .prepare()
//   .then(() => {
//     const server = express();

//     server.get("/post/:slug", (req, res) => {
//       const actualPage = "/post";
//       const queryParams = { slug: req.params.slug, apiRoute: "post" };
//       app.render(req, res, actualPage, queryParams);
//     });

//     server.get("/page/:slug", (req, res) => {
//       const actualPage = "/post";
//       const queryParams = { slug: req.params.slug, apiRoute: "page" };
//       app.render(req, res, actualPage, queryParams);
//     });

//     server.get("/category/:slug", (req, res) => {
//       const actualPage = "/category";
//       const queryParams = { slug: req.params.slug };
//       app.render(req, res, actualPage, queryParams);
//     });

//     server.get("/_preview/:id/:wpnonce", (req, res) => {
//       const actualPage = "/preview";
//       const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
//       app.render(req, res, actualPage, queryParams);
//     });

//     server.get("*", (req, res) => {
//       return handle(req, res);
//     });

//     server.listen(3000, err => {
//       if (err) throw err;
//       console.log("> Ready on http://localhost:3000");
//     });
//   })
//   .catch(ex => {
//     console.error(ex.stack);
//     process.exit(1);
//   });
