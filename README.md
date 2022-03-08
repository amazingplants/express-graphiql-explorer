Use `graphiql-explorer` in your Express app.

## Installation

```
npm install express-graphql-explorer
```

## Usage

```
const graphiqlExplorer = require('express-graphiql-explorer')
const express = require('express')

const app = express()

app.use('/graphiql', graphiqlExplorer({
  graphqlEndpoint: '/graphql', 
  defaultQuery: `query MyQuery {}`
}))

```

