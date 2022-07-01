const { gql } = require("apollo-server-express");

const typeDefinitions = gql`
    # Type definition 
    type User {
        id: Int!,
        name: String!
        email: String!
        avatarURL: String!
        about: String!
    }

    # Queries 
    type Query {
        getAllUsers: [User!]!
    }

    # Mutations
`;

module.exports = { typeDefinitions };
