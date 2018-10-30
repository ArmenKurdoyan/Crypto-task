import React, { Component } from 'react';
import Thead from './Thead/Thead';
import Tbody from './Tbody/Tbody';
import './Table.css';

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            toShow: [],
            sortingReverse: false,
            sortBy: 'rank',
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
            document.getElementById(this.state.sortBy).style.display = `none`;
            if (this.props.viewAll) {
                this.setState({
                    toShow: this.state.data,
                })
            } else {
                const tempToShow = this.state.data.slice(20 * (this.props.currentPage - 1), 20 * this.props.currentPage);
                this.setState({
                    toShow: tempToShow,
                })
            }
        }
    }

    handleClick(event) {
        let tempArray = this.state.toShow;
        let arrowReverse = undefined;
        
        if (event === this.state.sortBy) {
            document.getElementById(this.state.sortBy).style.display = `block`;
            tempArray = this.state.toShow.reverse();
            arrowReverse = !this.state.sortingReverse;
        } 
        if (event !== this.state.sortBy) {
            document.getElementById(this.state.sortBy).style.display = `none`;
            document.getElementById(event).style.display = `block`;
            arrowReverse = false;
            tempArray.sort(function(a, b) {
                if (a[event] === undefined) {
                    a = a.quotes.USD;
                    b = b.quotes.USD;
                }

                if (a[event] < b[event]) {
                  return 1;
                }
                if (a[event] > b[event]) {
                  return -1;
                }
                return 0;
              });
        }
        this.setState({
            toShow: tempArray,
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
                        arrowStatus = {this.state.sortingReverse}/>
                    <Tbody data={this.state.toShow}/> 
                </tbody>
            </table>
        );
    }
}