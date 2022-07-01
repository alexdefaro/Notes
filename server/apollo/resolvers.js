const { gql } = require("apollo-server-express");

const fakeData = require('../fakedata');

const apolloResolvers = {
    Query: {
        getAllUsers() {
            return fakeData.registeredUsers                  
        }
    }
} 

module.exports = { apolloResolvers };
