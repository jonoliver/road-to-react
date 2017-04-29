import React, { Component } from 'react';
import './App.css';

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    {children}
    <input type="text" value={value} onChange={onChange} />
    <button type='submit'>{children}</button>
  </form>

const Table = ({ list, onDismiss }) =>
  <div className='table'>
    { list.map(item =>
      <div id='list' key={ item.objectID } className='table-row'>
        <span className='title'>
          <a href={ item.url }>{ item.title }</a>
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
const DEFAULT_PAGE = 0;
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

  fetchSearchTopstories(searchTerm, page) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`

    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch((error) => error)
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  render(){
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    return(
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            ><span>Search</span></Search>
        </div>
        {
          result &&
          <Table list={result.hits} onDismiss={this.onDismiss} />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}>More</Button>
        </div>
      </div>
    )
  }
}

export default App;
