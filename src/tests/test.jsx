import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../App';
import AppState from '../AppState';
import server from '../../server';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('<App />', () => {
  const props = new (AppState)();

  it('Renders the header', () => {
    expect(
      shallow(<App appState={props} />).find('.header')
    ).to.have.length(1);
  });

  it('Renders the button', () => {
    expect(
      shallow(<App appState={props} />).find('button')
    ).to.have.length(1);
  });
});

describe('API', () => {
  it('Get users', (done) => {
    chai.request(server)
    .get('/api/users')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
