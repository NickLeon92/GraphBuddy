const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../graph-buddy/', 'build/');
const port = process.env.PORT || 3000;

const { ApolloServer } = require('apollo-server-express');
const { User, Graph } = require('./models');
const { signToken } = require('./utils/auth');
// const { typeDefs, resolvers } = require('./schemas');
const typeDefs = require('./schemas/typeDefs')
// const resolvers = {
//   Query: {
//     users: async () => {
//       return User.find().populate('graphs');
//     },
//     user: async (parent, { username }) => {
//       return User.findOne({ username }).populate('graphs');
//     },
//     me: async (parent, args, context) => {
//       if (context.user) {
//         return User.findOne({ _id: context.user._id }).populate('graphs');
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//   },

//   Mutation: {
//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });
//       const token = signToken(user);
//       return { token, user };
//     },
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('No user found with this email address');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect credentials');
//       }

//       const token = signToken(user);

//       return { token, user };
//     },

//     addGraph: async (parent, {id, title, labels, data}, context) => {
//       console.log(  `attempting to add graph with
//        id:${id}, 
//        title: ${title}, 
//        data: ( ${labels}, ${data} )`)
//        let newGraph = await Graph.create({
//          id:id,
//          title:title
//        });
//        if (labels !=='N/A'){
//          newGraph = await Graph.findOneAndUpdate(
//            {_id: newGraph._id},
//            {
//              $push: {labels:labels, data:parseInt(data)}
//            }
//          )
//        }

//        return await User.findOneAndUpdate(
//          {_id: context.user._id},
//          {
//            $push:{ graphs: newGraph }
//          }
//        )
//     },
//     updateGraph: async (parent, {id, title, labels, data}) => {
//       console.log(  `attempting to update graph with 
//        id:${id}, 
//        title: ${title}, 
//        data: ( ${labels}, ${data} )`)

//       let updatedGraph = await Graph.findOneAndUpdate(
//         {id: id},
//         {
//           $set: {title: title}
//         }
//         )

//       if(labels !== 'N/A'){
//         updatedGraph = await Graph.findOneAndUpdate(
//           {_id:updatedGraph._id},
//           {
//             $push: { labels: labels, data:parseInt(data) },
//           },
//           {new:true, multi:true}
//         )
//       }
//       return updatedGraph
//     },
//     removeGraph: async (parent, {id}) => {
//       console.log(`attempting to remove graph: ${id}`)
//       return await Graph.findOneAndDelete(
//         {id: id},
//       )
//     }
//   },
// };
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());



app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
   console.log('Server is up!');
});

// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');

// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');

// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const app = express();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../graph-buddy/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../graph-buddy/build/index.html'));
// });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });
