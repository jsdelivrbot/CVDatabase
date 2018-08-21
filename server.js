var express = require('express');
var graphqlHTTP = require('express-graphql'); 
var {buildSchema} = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input NewCandidate {
    vacancy: String!
    name: String!
    email: String!
    mobile: Int!
    skills: [String]!
  }

  type Candidate {
    id: ID!
    vacancy: String!
    name: String!
    email: String!
    mobile: Int!
    skills: [String]!
  }

  type Query {
    getCandidate(id: ID!): Candidate
  }

  type Mutation {
    newCandidate(input: NewCandidate): Candidate
    updateCandidate(id: ID!, input: NewCandidate): Candidate
  }
`);

// If Candidate had any complex fields, we'd put them on this object.
class Candidate {
  constructor(id, {vacancy, name, email, mobile, skills}) {
    this.id = id;
    this.vacancy = vacancy;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.skills = skills;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getCandidate: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no candidate exists with id ' + id);
    }
    return new Candidate(id, fakeDatabase[id]);
  },
  newCandidate: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Candidate(id, input);
  },
  updateCandidate: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no candidate exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Candidate(id, input);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
