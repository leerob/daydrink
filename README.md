# daydrink

This application is part of [Mastering Next.js](https://masteringnextjs.com/).

![banner](https://user-images.githubusercontent.com/9113740/74108760-1c6cb600-4b43-11ea-9932-dfb3c87ac843.png)
<img width="1433" alt="app" src="https://user-images.githubusercontent.com/9113740/74108763-21ca0080-4b43-11ea-9cb3-59d39bc2842b.png">

## Running Locally

```bash
$ git clone https://github.com/leerob/daydrink.git
$ cd leerob.io
```

Set GraphQL URL for Apollo Client by adding the following field to `.env` file.
```
GRAPHQL_URL=
```

```
$ yarn
$ yarn dev
```

To use Firebase Auth, you will need to run `now dev` and have a `.env` file similar to this.

```
FIREBASE_API_KEY=
FIREBASE_APP_ID=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
```

## Built Using

-   [Next.js](https://nextjs.org/)
-   [Now](https://zeit.co/now)
-   [Chakra UI](https://chakra-ui.com/)
-   [Apollo GraphQL](https://www.apollographql.com/docs/react/)
-   [Hasura](https://hasura.io/)
-   [Prettier](https://prettier.io/)
