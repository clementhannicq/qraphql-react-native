/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const lokka = new Lokka({
  transport: new Transport('http://10.63.110.93:8888/graphql')
});

export default class client extends Component {
  componentWillMount() {
    this.setState({ person: {}})
    lokka.query(`
      {
        person(id: "1") {
          name
          meetups {id, name, members {name}}
          followed_by {name}
          follows {name}
        }
      }
    `).then( ({ person }) => {
        this.setState({ person });
    });
  }

  render() {
    const person = this.state.person;
    const meetups = person.meetups || [];
    const follows = person.follows || [];
    const followed_by = person.followed_by || [];
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {person.name}
        </Text>
        <Text style={styles.welcome}>
          Meetups :
        </Text>
        {meetups.map(m => (
          <Text key={m.id} style={styles.instructions}>{m.name} with {m.members.map(p => p.name).join(', ')}</Text>
        ))}
        <Text style={styles.instructions}>
          Following : {follows.map(p => p.name).join(', ')}
        </Text>
        <Text style={styles.instructions}>
          Followed by : {followed_by.map(p => p.name).join(', ')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('client', () => client);
