import { gql } from 'graphql-tag';

// schema for GraphQL
export const typeDefs = gql`
    type Task {
        id: ID!
        title: String!
        description: String
        userId: ID!
    }

    type Query {
        tasks: [Task]
    }

    type Mutation {
        createTask(title: String!, description: String): Task
    }
`;
// schema for creating tasks
export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String) {
    createTask(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;