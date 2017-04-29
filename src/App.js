import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'Github',
    url: 'https://github.com/jonoliver',
    author: 'Jon Oliver',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Blog',
    url: 'http://jonoliver.codes',
    author: 'Jon Oliver',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  render = () =>
    <div className="App">
      { list.map(item =>
        <div id='list' key={ item.objectID }>
          <a href="{ item.url }">{ item.title }</a>
          <span>{ item.author }</span>
          <span>{ item.num_comments }</span>
          <span>{ item.points }</span>
        </div>
      )}
    </div>
}

export default App;
