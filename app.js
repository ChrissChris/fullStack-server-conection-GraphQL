const express = require("express")
const app = express()
const cors = require("cors")
const { graphqlHTTP } = require("express-graphql")
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql")

app.use(cors)

const seedData = [
  {
    id: 1,
    language: "JavaScript",
    loved: "true",
  },
  {
    id: 1,
    language: "Python",
    loved: "true",
  },
  {
    id: 1,
    language: "C",
    loved: "true",
  },
]

const languageType = new GraphQLObjectType({
  name: "Language",
  description: "Programming Language",
  fields: {
    id: {
      type: GraphQLInt,
    },
    language: {
      type: GraphQLString,
    },
    loved: {
      type: GraphQLBoolean,
    },
  },
})

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the root query",
  fields: {
    languages: { type: GraphQLList(languageType), resolve: () => seedData },
    language: {
      type: languageType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, { id }) => seedData.find((language) => language.id == id),
    },
  },
})

const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "This is the root mutation",
  fields: {
    language: {
      type: languageType,
      args: {
        lang: { type: GraphQLString },
        loved: { type: GraphQLBoolean },
      },
      resolve: (_, { lang, loved }) => {
        const newLanguage = {
          id: seedData.length + 1,
          language: lang,
          loved: loved,
        }
        seedData.concat(newLanguage)
        return newLanguage
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`App listening on PORT${PORT}`)
})
