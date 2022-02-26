const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../graph-buddy/', 'build/');
const port = process.env.PORT || 3000;

// const { ApolloServer } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
// const db = require('./config/connection');
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
