/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament').expect(200)
    );
  });
  // describe('POST /dog', ()=>{
  //   it('should create a new dog', ()=>{agent.post('/dog')
  //   .send({name:'perro db', origin: 'db', weight : '98'})
  //   .then(res=>{

  //     console.log(Object.keys(res), res.body);
  //     expect(res.body.result).toEqual('Raza perro db creada');
  //     expect(200);})
    
  //   })
  // })
});
