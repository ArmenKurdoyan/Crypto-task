import React, { Component } from 'react';

export default class Header extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.data.data === undefined) {
            return false;
        }
        return true;
    }

    render() {
        const maxPages = Math.ceil(this.props.data.data / 20);
        return (
            <div>
                <div className="header">
                {
                    this.props.data.currentPage > 1 && !this.props.data.viewAll &&
                        <input 
                            type="button"
                            className="item" 
                            value="Previous 20" 
                            onClick={this.props.data.changeDown} />
                }
                {
                    this.props.data.currentPage < maxPages && !this.props.data.viewAll &&
                        <input 
                            type="button"
                            className="item" 
                            value="Next 20" 
                            onClick={this.props.data.changeUp} />
                }
                {
                    !this.props.data.viewAll &&
                        <input 
                            className="item"
                            type="button"
                            value="View All"
                            onClick={this.props.data.showAll}/>
                }
                {
                    this.props.data.viewAll &&
                        <input 
                            className="item"
                            type="button"
                            value="Top 20"
                            onClick={this.props.data.showAll}/>
                }   
                </div>
            </div>

        );
    }
}