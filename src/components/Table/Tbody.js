import React, { Component } from 'react';

export default class Tbody extends Component {

    componentDidUpdate() {
        if (this.props.data === undefined || this.props.data.length === 0) {
            return false;
        }
        return true;
    }

    render() {
        return (
            this.props.data.map(item => {
                return (
                <tr key={item.name}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                    <td>{item.quotes.USD.market_cap}</td>
                    <td>{item.quotes.USD.price.toFixed(2)}</td>
                    <td>{Math.round(item.quotes.USD.volume_24h)}</td>
                    <td>{item.circulating_supply} {item.symbol}</td>
                    <td>{item.quotes.USD.percent_change_24h}</td>
                </tr>
                );
            })    
        );
    }
}