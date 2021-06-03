require("dotenv").config()
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const TEST_PASSWORD = "imtesting"
const JWT_SECRET = "imsecret"

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      // let booksList = [...books]
      // if (args.author) {
      //   booksList = booksList.filter((book) => book.author === args.author)
      // }
      let bookList = null
      if (args.genre) {
        bookList = await Book.find({ genres: { $in: args.genre } })
      } else {
        bookList = await Book.find({})
      }
      return Book.populate(bookList, { path: "author" })
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.authenticatedUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.authenticatedUser) {
        throw new AuthenticationError("authentication needed")
      }

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

    editAuthor: async (root, args, context) => {
      if (!context.authenticatedUser) {
        throw new AuthenticationError("authentication needed")
      }

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

    login: async (root, args) => {
      try {
        if (args.password !== TEST_PASSWORD) {
          throw new Error("wrong credentials")
        }

        const user = await User.findOne({ username: args.username })
        if (!user) {
          throw new Error("user don't exist")
        } else {
          const userForToken = {
            username: user.username,
            id: user._id,
          }
          const token = jwt.sign(userForToken, JWT_SECRET)

          return { value: token }
        }
      } catch (error) {
        throw new AuthenticationError(error.message)
      }
    },

    createUser: async (root, args) => {
      try {
        const newUser = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        await newUser.save()

        return newUser
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
  context: async ({ req }) => {
    const authentication = req ? req.headers.authorization : null
    if (authentication && authentication.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(authentication.substring(7), JWT_SECRET)
      const authenticatedUser = await User.findById(decodedToken.id)
      return { authenticatedUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
