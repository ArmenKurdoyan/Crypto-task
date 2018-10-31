import React, { Component } from 'react';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewAll: false,
      currentPage: 1,
      data: undefined,
    }

    this.getCount = this.getCount.bind(this);
    this.handleChangePageUp = this.handleChangePageUp.bind(this);
    this.handleChangePageDown = this.handleChangePageDown.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
  }

  getCount(count) {
    this.setState({
      data: count,
    })
  }

  handleShowAll() {
    this.setState({
      viewAll: !this.state.viewAll,
      currentPage: 1,
    })
  }

  handleChangePageUp() {
    this.setState({
      currentPage: ++this.state.currentPage,
    })
  }

  handleChangePageDown() {
    this.setState({
      currentPage: --this.state.currentPage,
    })
  }

  render() {
    const data = {
      ...this.state,
      changeUp: this.handleChangePageUp,
      changeDown: this.handleChangePageDown,
      showAll: this.handleShowAll,
    }

    return (
      <div className="App">
        <h1 className="title">All CryptoCurrencies</h1>
        <div className="context">
          <Header data={data}/>
          <Table 
            getCount={this.getCount}
            currentPage={this.state.currentPage} 
            viewAll={this.state.viewAll}/>
        </div>
      </div>
    );
  }
}

export default App;
