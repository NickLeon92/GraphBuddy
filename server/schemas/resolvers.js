const { AuthenticationError } = require('apollo-server-express');
const { GraphQLSpecifiedByDirective } = require('graphql');
const { User, Graph } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('graphs');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('graphs');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('graphs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // addGraph: async (parent, {userId, title }, context) => {
    //   console.log("attempting to add graph for userId: ", userId)
    //   const graph = await Graph.create({title})

    //   return await User.findOneAndUpdate(
    //     {_id: userId},
    //     {
    //       $addToSet: {graphs: graph}
    //     },
    //     )
      
    // },
    addGraph: async (parent, {id, title, labels, data}, context) => {
      console.log(  `attempting to add graph with id:${id}, title: ${title}, data: ( ${labels}, ${data} )`)
    },
    updateGraph: async (parent, {id, title, labels, data}, context) => {

    },
  },
};

module.exports = resolvers;
