import React, { Component } from 'react';
import './App.css';

const isSearched = (searchTerm)  => (item) =>
  !searchTerm ||
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input type="text" value={value} onChange={onChange} />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className='table'>
    { list.filter(isSearched(pattern)).map(item =>
      <div id='list' key={ item.objectID } className='table-row'>
        <span className='title'>
          <a href="{ item.url }">{ item.title }</a>
        </span>
        <span className='author'>{ item.author }</span>
        <span>{ item.num_comments }</span>
        <span>{ item.points }</span>
        <span>
          <Button onClick={() => onDismiss(item.objectID)} className='button-inline'>Dismiss</Button>
        </span>
      </div>
    )}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({result: { ...this.state.result, hits: updatedHits }})
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopstories(result) {
    this.setState({ result });
  }

  fetchSearchTopstories(searchTerm) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`

    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch((error) => error)
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  render(){
    const { searchTerm, result } = this.state;
    return(
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}><span>Search</span></Search>
        </div>
        {
          result &&
          <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
        }
      </div>
    )
  }
}

export default App;
