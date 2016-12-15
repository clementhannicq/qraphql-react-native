import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import { getPersons, getPerson, personType } from './model/person';
import { getMeetups, meetupType } from './model/meetup';
import { membershipType } from './model/membership';


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      persons: {
        type: new GraphQLList(personType),
        description: 'Fetch all persons',
        resolve: (root) => {
          return getPersons();
        }
      },
      person: {
        type: personType,
        description: 'Fetch one person',
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Id of the person to fetch',
          }
        },
        resolve: (root, { id }) => {
          return getPerson(id);
        }
      },
      meetups: {
        type: new GraphQLList(meetupType),
        description: 'Fetch all meetups',
        resolve: (root) => {
          return getMeetups();
        }
      }
    })
  }),
  types: [personType, meetupType]
});

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(8888, () => console.log('Now browse to localhost:8888/graphql'));
