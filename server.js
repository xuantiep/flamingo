const express = require('express');
const next = require('next');
const graphqltools = require('graphql-tools');
const apolloFetch = require('apollo-fetch');
// import {makeRemoteExecutableSchema, introspectSchema} from 'graphql-tools'
// import { createApolloFetch } from 'apollo-fetch';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const createRemoteSchema = async (uri) => {
  const fetcher = apolloFetch.createApolloFetch({uri: uri});
  console.log("hello");
  try {
  const schemaIntrospect = await graphqltools.introspectSchema(fetcher);
  } catch(e) {
    console.log('error message below');
    console.log(e);
  }
  console.log("hello1");

  const toReturn = await graphqltools.makeRemoteExecutableSchema({
    schema: schemaIntrospect,
    fetcher
  });

  console.log("hello2");
  return toReturn;
  // return graphqltools.makeRemoteExecutableSchema({
  //   schema: await graphqltools.introspectSchema(fetcher),
  //   fetcher
  // });
}

app.prepare().then(() => {
  createRemoteSchema('http://localhost:8080/graphql').then((schema) => {
    const apollo = new ApolloServer({schema});

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
