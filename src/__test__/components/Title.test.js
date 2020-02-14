import React from 'react';
import { shallow } from 'enzyme';
import Title from '../../components/Title/index.js';
const title = 'Test Title';
let wrapped = shallow(
  <Title>{title}</Title>
);
describe('Title', () => {
  it('renders the Titles children', () => {
    expect(wrapped.find('h1').text()).toEqual(title);
  });
});
