import React, { Component } from 'react';
import {HeaderNames} from '../../../Columns';
import './Thead.css';

export default class TableHead extends Component {

    render() {
        const props = this.props;
        const arrowDirection = this.props.arrowDirection ? ("arrow-up") : ("arrow-down");
        return (
            <tr className="row">
            {
                Object.keys(HeaderNames).map((item, index) => (
                    <th className="head-element" key={index} onClick={function() {props.sort(item)}}>
                        { 
                            props.currentArrow === item && props.arrowStatus &&
                                <div className={arrowDirection}></div> 
                        }
                        {HeaderNames[item]}
                    </th>
                ))
            }
            </tr>
        );
    }
}