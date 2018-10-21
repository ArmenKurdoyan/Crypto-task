import React, { Component } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedList: `Top 100 Cryptocurrencies by Market Capitalization`,
      valume: `USD`,
      sortName: `name`,
      currentPage: 3,
      maxPages: 5,
      showAll: false,
      companies: undefined,
    }

    this.handleChangeList = this.handleChangeList.bind(this);
    this.handleChangeValume = this.handleChangeValume.bind(this);
    this.handleChangePageDown = this.handleChangePageDown.bind(this);
    this.handleChangePageUp = this.handleChangePageUp.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
  }

  handleChangeList(event) {
    this.setState({
      selectedList: event.target.value,
    })
  }

  handleChangeValume(event) {
    this.setState({
      valume: event.target.value,
    })
  }

  handleChangePageUp() {
    this.setState({
      currentPage: ++this.state.currentPage,
      showAll: false,
    })
  }

  handleChangePageDown() {
    this.setState({
      currentPage: --this.state.currentPage,
      showAll: false,
    })
  }

  handleShowAll() {
    this.setState({
      showAll: true,
    })
    alert(`done`);
  }

  render() {
    const data = {
      ...this.state,
      handleChangeList: this.handleChangeList,
      handleChangeValume: this.handleChangeValume,
      handleChangePageUp: this.handleChangePageUp,
      handleChangePageDown: this.handleChangePageDown,
      handleShowAll: this.handleShowAll,
    }

    return (
      <div className="App">
        <Header data={data}/>
        <Table data={data}/>
      </div>
    );
  }
}

export default App;
