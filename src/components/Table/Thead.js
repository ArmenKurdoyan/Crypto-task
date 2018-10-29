import React, { Component } from 'react';
import {HeaderNames} from '../../Columns';

export default class TableHead extends Component {

    render() {
        const props = this.props;

        return (
            <tr>
            {
                Object.keys(HeaderNames).map((item, i) => (
                    <th key={i} onClick={function() {props.sort(item)}}>
                        {HeaderNames[item]}
                    </th>
                ))
            }
            </tr>
        );
    }
}