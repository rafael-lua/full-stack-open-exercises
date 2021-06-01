require("dotenv").config()
const { ApolloServer, gql, UserInputError } = require("apollo-server")
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

      return Book.find({ genres: { $in: args.genre } })
    },
    allAuthors: () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      try {
        let authorExist = await Author.findOne({ name: args.author })
        if (!authorExist) {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          authorExist = newAuthor
        }
        const newBook = new Book({ ...args, author: authorExist })
        await newBook.save()
        return newBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args) => {
      try {
        const editedAuthor = await Author.findOne({ name: args.name })
        if (editedAuthor) {
          editedAuthor.born = args.setBornTo
          await editedAuthor.save()
          return editedAuthor
        }

        return null
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author")
      let booksCount = 0
      for (let i = 0; i < books.length; i++) {
        if (books[i].author.name === root.name) {
          booksCount += 1
        }
      }
      return booksCount
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
