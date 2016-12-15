import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql';
import memberships from '../data/memberships'
import { meetupType, getMeetup } from './meetup';
import { personType, getPerson } from './person';

export const membershipType = new GraphQLObjectType({
  name: 'Membership',
  description: 'Someone',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the membership.',
    },
    person: {
      type: new GraphQLNonNull(personType),
      description: 'The member',
      resolve: membership => getPerson(membership.person),
    },
    meetup: {
      type: new GraphQLNonNull(meetupType),
      description: 'The meetup he is a member of',
      resolve: membership => getMeetup(membership.meetup),
    },
  }),
});
