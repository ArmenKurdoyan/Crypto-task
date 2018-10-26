import React, { Component } from 'react';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortName: `id`,
      nextPage: true,
      currentPage: 1,
      companies: undefined,
    }
  }

  render() {
    const data = {
      ...this.state,
      // handleChangeList: this.handleChangeList,
      // handleChangeValume: this.handleChangeValume,
      // handleChangePageUp: this.handleChangePageUp,
      // handleChangePageDown: this.handleChangePageDown,
      // handleShowAll: this.handleShowAll,
    }

    return (
      <div className="App">
        <h1>All CryptoCurrencies</h1>
        <Header data={data}/>
        <Table data={data}/>
      </div>
    );
  }
}

export default App;
