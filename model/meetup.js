import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql';
import memberships from '../data/memberships';
import meetups from '../data/meetups';
import { personType, getPerson } from './person';
import { some } from 'lodash'

export const getMeetup = (id) => Promise.resolve(meetups[id]);

export const getMeetups = () => Promise.resolve(Object.values(meetups));

const getMembers = (meetup) => Promise.resolve(Object.values(memberships).filter(m => m.meetup === meetup.id).map(m => getPerson(m.person)));

const getOwner = (meetup) => getPerson(meetup.owner);

export const meetupType = new GraphQLObjectType({
  name: 'Meetup',
  description: 'A meetup',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the meetup.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the person.',
    },
    members: {
      type: new GraphQLList(personType),
      description: 'Members of this meetup',
      resolve: getMembers,
    },
    owner: {
      type: new GraphQLNonNull(personType),
      description: 'Creator of this meetup',
      resolve: getOwner,
    }
  }),
});
