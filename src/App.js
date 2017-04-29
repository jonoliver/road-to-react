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

const isSearched = (searchTerm)  => (item) =>
  !searchTerm ||
  item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const newList = this.state.list.filter(isNotId)
    this.setState({list: newList})
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render(){
    const { searchTerm, list } = this.state;
    return(
    <div className="App">
      <form action="">
        <input type="text" onChange={this.onSearchChange} />
      </form>
      { list.filter(isSearched(searchTerm)).map(item =>
        <div id='list' key={ item.objectID }>
          <a href="{ item.url }">{ item.title }</a>
          <span>{ item.author }</span>
          <span>{ item.num_comments }</span>
          <span>{ item.points }</span>
          <span>
            <button onClick={ () => this.onDismiss(item.objectID) }
              type='button'>Dismiss</button>
          </span>
        </div>
      )}
    </div>
    )
  }
}

export default App;
