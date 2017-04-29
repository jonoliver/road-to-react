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

  class Search extends Component {
    render(){
      const { value, onChange, children } = this.props;
      return(
        <form>
          {children}
          <input type="text" value={value} onChange={onChange} />
        </form>
      )
    }
  }

class Table extends Component {
  render(){
    const { list, pattern, onDismiss } = this.props;
    return(
      <div>
        { list.filter(isSearched(pattern)).map(item =>
          <div id='list' key={ item.objectID }>
            <a href="{ item.url }">{ item.title }</a>
            <span>{ item.author }</span>
            <span>{ item.num_comments }</span>
            <span>{ item.points }</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;

    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    );
  }
}

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
        <Search value={searchTerm} onChange={this.onSearchChange}><span>Search</span></Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    )
  }
}

export default App;
