import React, { Component } from 'react';
import Tbody from './Tbody';
import Thead from './Thead';

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            toShow: [],
            sortBy: `rank`,
        }
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
                toShow: resp.data.slice(20 * (this.props.currentPage - 1), 20 * this.props.currentPage),
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.viewAll) {
                this.setState({
                    toShow: this.state.data,
                })
            } else {
                const x = this.state.data.slice(20 * (this.props.currentPage - 1), 20 * this.props.currentPage);
                this.setState({
                    toShow: x,
                })
            }
        }
    }

    handleClick(event) {

        let tempArray = this.state.toShow;
        
        if (event === this.state.sortBy) {
            tempArray = this.state.toShow.reverse();
        } 
        console.log(tempArray);
        if (event !== this.state.sortBy) {
            tempArray.sort(function(a, b) {

                if (a[event] === undefined) {
                    console.log(event);
                    console.log(a.quotes.USD[event])
                    a = a.quotes.USD;
                    b = b.quotes.USD;
                }

                if (a[event] > b[event]) {
                  return 1;
                }
                if (a[event] < b[event]) {
                  return -1;
                }
                return 0;
              });
        }
        this.setState({
            toShow: tempArray,
            sortBy: event,
        })
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <Thead 
                        sort={this.handleClick} 
                        arrowStatus = {this.state.sortingReverse}/>
                    <Tbody data={this.state.toShow}/> 
                </thead>
            </table>
        );
    }
}

