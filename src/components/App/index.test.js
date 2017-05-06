import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App, { Table } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('snapshots', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ]
  }
  it('shows two items in the list', () => {
    const element = shallow(<Table {...props} />)
    expect(element.find('.table-row').length).toBe(2);
  });
});
