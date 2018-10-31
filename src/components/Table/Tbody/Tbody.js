import React, { Component } from 'react';
import './Tbody.css';

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
                <tr className="row" key={item.name}>
                    <td className="element">{item.rank}</td>
                    <td className="element">{item.name}</td>
                    <td className="element">{item.quotes.USD.market_cap}</td>
                    <td className="element">{item.quotes.USD.price.toFixed(2)}</td>
                    <td className="element">{Math.round(item.quotes.USD.volume_24h)}</td>
                    <td className="element">{item.circulating_supply} {item.symbol}</td>
                    <td className="element">{item.quotes.USD.percent_change_24h}</td>
                </tr>
                );
            })    
        );
    }
}