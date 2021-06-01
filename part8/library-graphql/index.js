require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server")
const mongoose = require("mongoose")

const Author = require("./models/author")
const Book = require("./models/book")

const MONGODB_URI = `mongodb+srv://fullstack:${process.env.DB_PASSWORD}@cluster0.akuye.mongodb.net/graphql?retryWrites=true`

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      // let booksList = [...books]
      // if (args.author) {
      //   booksList = booksList.filter((book) => book.author === args.author)
      // }

      // if (args.genre) {
      //   booksList = booksList.filter((book) => book.genres.includes(args.genre))
      // }

      return Book.find({})
    },
    allAuthors: () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      let authorExist = await Author.findOne({ name: args.author })
      if (!authorExist) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        authorExist = newAuthor
      }
      const newBook = new Book({ ...args, author: authorExist })
      await newBook.save()
      return newBook
    },

    editAuthor: (root, args) => {
      const editedAuthor = authors.find((author) => author.name === args.name)
      if (editedAuthor) {
        editedAuthor.born = args.setBornTo
        authors = authors.map((author) => {
          return author.name === args.name ? editedAuthor : author
        })
        return editedAuthor
      }

      return null
    },
  },

  Author: {
    bookCount: (root) => {
      return books.reduce((acc, book) => {
        if (book.author === root.name) {
          acc += 1
        }
        return acc
      }, 0)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
