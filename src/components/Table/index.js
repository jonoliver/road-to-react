import React, { Component } from 'react';
import Button from '../Button'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = props
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentWillReceiveProps(props){
    this.state = props
  }

  onDismiss(id){
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  }

  render(){
    const {results, searchKey} = this.state
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return(
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
              <Button onClick={() => this.onDismiss(item.objectID)} className='button-inline'>Dismiss</Button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default Table;
