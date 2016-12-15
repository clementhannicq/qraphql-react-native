import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql';
import persons from '../data/persons'
import memberships from '../data/memberships'
import meetups from '../data/meetups'
import { meetupType, getMeetup } from './meetup';
import { membershipType } from './membership';
import { some } from 'lodash'

export const getPerson = (id) => Promise.resolve(persons[id]);

export const getPersons = () => Promise.resolve(Object.values(persons));

const getFollowers = (person) => Promise.resolve(Object.values(persons).filter(p => some(p.follows, id => id === person.id)));

const getFollowed = (person) => Promise.resolve(person.follows.map(getPerson));

const getMeetups = (person) => Promise.resolve(Object.values(memberships).filter(m => m.person === person.id).map(m => getMeetup(m.meetup)));

const getMemberships = (person) => Promise.resolve(Object.values(memberships).filter(m => m.person === person.id));

export const personType = new GraphQLObjectType({
  name: 'Person',
  description: 'Someone',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the person.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the person.',
    },
    follows: {
      type: new GraphQLList(personType),
      description: 'Persons followed by this person',
      resolve: getFollowed,
    },
    followed_by: {
      type: new GraphQLList(personType),
      description: 'Persons following that person',
      resolve: getFollowers,
    },
    meetups: {
      type: new GraphQLList(meetupType),
      description: 'meetups that person is going to',
      resolve: getMeetups,
      deprecationReason: 'use memberships'
    },
    memberships: {
      type: new GraphQLList(membershipType),
      description: 'meetups that person is going to',
      resolve: getMemberships
    }
  }),
});
