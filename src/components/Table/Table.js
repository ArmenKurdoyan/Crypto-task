import React, { Component } from 'react';
import Thead from './Thead/Thead';
import Tbody from './Tbody/Tbody';
import './Table.css';

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            sortingReverse: false,
            sortBy: 'rank',
        }
        this.showArrow = false;
        this.showTable = this.showTable.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(`https://api.coinmarketcap.com/v2/ticker/?sort=id&structure=array`)
        .then(resp => resp.json())
        .then(resp => {
            this.props.getCount(resp.data.length);
            this.setState({
                data: resp.data.sort(function(a, b){
                        return a.rank - b.rank;
                    }),
            })
        });
    }

    componentDidUpdate(prevProps) {
        this.showArrow = false;
        if (prevProps.currentPage !== this.props.currentPage) {
            this.setState({
                sortBy: `rank`,
                sortingReverse: false,
            })
        }
    }

    showTable() {
        let tempArray = this.props.viewAll ? (this.state.data) : (this.state.data.slice(20 * (this.props.currentPage - 1), 20 * this.props.currentPage));
        const item = this.state.sortBy;
        if (!this.state.sortingReverse) {
            tempArray.sort(function(a, b) {
                if (a[item] === undefined) {
                    a = a.quotes.USD;
                    b = b.quotes.USD;
                }
                if (a[item] > b[item]) {
                  return 1;
                }
                if (a[item] < b[item]) {
                  return -1;
                }
                return 0;
            });
        } else {
            tempArray.sort(function(a, b) {
                if (a[item] === undefined) {
                    a = a.quotes.USD;
                    b = b.quotes.USD;
                }
                if (a[item] < b[item]) {
                  return 1;
                }
                if (a[item] > b[item]) {
                  return -1;
                }
                return 0;
            });
        }
        return <Tbody data={tempArray}/>
    }

    handleClick(event) {
        this.showArrow = true;
        let arrowReverse = null;
        arrowReverse = event === this.state.sortBy ? 
        (arrowReverse = !this.state.sortingReverse) : 
        (arrowReverse = false);
        
        this.setState({
            sortBy: event,
            sortingReverse: arrowReverse,
        })      
    }

    render() {
        return (
            <table className="table">
                <tbody>
                    <Thead 
                        sort={this.handleClick} 
                        arrowDirection={this.state.sortingReverse}
                        currentArrow={this.state.sortBy}
                        arrowStatus={this.showArrow}/>
                    {this.showTable()} 
                </tbody>
            </table>
        );
    }
}