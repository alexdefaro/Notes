const graphql = require("graphql");
const { GraphQLInt, GraphQLString, GraphQLObjectType } = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    },
});

module.exports = userType;