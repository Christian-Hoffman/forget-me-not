const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const format = require("../utils/dateFormat");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {

    //User Mutations
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

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

    //Note Mutations
    addNote: async (parent, args, context) => {
      const user = await User.findOneAndUpdate(
        { _id: args.id },
        { $addToSet: { notes: { title: args.title, body: args.body, createdAt: format(Date.now()), isPublic: args.isPublic } } },
        { new: true }
      );
      return user;
    },
    deleteNote: async (parent, args, context) => {
      const user = await User.findOneAndUpdate(
        { _id: args.userId },
        { $pull: { notes: { _id: args.noteId, } } },
        { new: true },
      );
      console.log(user);
      return user;
    },
    editNote: async (parent, args, context) => {
      const user = await User.findOneAndUpdate(
        { "_id": args.userId, "notes._id": args.noteId },
        { $set: { notes: { title: args.title, body: args.body, createdAt: format(Date.now()), isPublic: args.isPublic } } },
        { new: true },
      );
      console.log(user);
      return user;
    },

    //List Mutations
    addList: async (parent, args, context) => {
      const user = await User.findOneAndUpdate(
        { "_id": args.id },
        { $addToSet: { lists: { 
          title: args.title,
          createdAt: format(Date.now()),
          isPublic: args.isPublic,
          listItems: [args.listItems[0]]
        } 
        } 
        },
        { new: true }
      )





      return user;
    }
  }
};

module.exports = resolvers;
