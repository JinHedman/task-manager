import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Task {
        id: ID!
        title: String!
        description: String
    }

    type Query {
        tasks: [Task]
    }

    type Mutation {
        createTask(title: String!, description: String): Task
    }
`;