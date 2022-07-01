const graphql = require("graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLList } = graphql;

const userType = require("./types/users")
const fakeData = require('../fakedata');

const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(userType),
            resolve(parentValue, args, request) {
                return fakeData.registeredUsers                  
            },

        }
    },
});

module.exports = new GraphQLSchema({
    query: rootQueryType,
    // mutation: "myatti"
})

