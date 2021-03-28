import React, { Component } from 'react';

import Terminal from '../terminal/terminal.component';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    render() {
        return(
            <div>
                {
                    this.state.isLoading ? <Terminal/> :

                    <div>
                        spast
                    </div>
                }
            </div>
        );
    }
}