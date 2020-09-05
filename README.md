# gatsby-source-duolingo

Source plugin for pulling user language data into Gatsby from Duolingo.

## Install

```shell
npm install --save gatsby-source-duolingo
```

or

```shell
yarn add gatsby-source-duolingo
```

## How to use

First, you need a way to pass environment variables to the build process, so secrets and other secured data aren't committed to source control. We recommend using [`dotenv`][dotenv] which will then expose environment variables. [Read more about dotenv and using environment variables here][envvars]. Then we can _use_ these environment variables and configure our plugin.

### Using Delivery API

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-duolingo`,
      options: {
        username: `your_username`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        identifier: process.env.DUOLINGO_IDENTIFIER,
        password: process.env.DUOLINGO_PASSWORD,
      },
    },
  ],
};
```

### Configuration options

**`username`** [string][required]

Duolingo username

**`identifier`** [string][required]

Email account used to sign-in to your Duolingo account

**`password`** [string][required]

Password used to sign-in to your Duolingo account

### Query for all nodes

```graphql
{
  allDuolingoLanguage {
    edges {
      node {
        id
        language_string
      }
    }
  }
}
```

### Query for a single node

```javascript
export const query = graphql`
  {
    duolingoLanguage(language: { eq: "zs" }) {
      id
      language_string
    }
  }
`;
```

[dotenv]: https://github.com/motdotla/dotenv
[envvars]: https://gatsby.dev/env-vars
