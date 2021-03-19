import './src/css/tailwind.css';
import './src/css/style.styl';

// ./gatsby-browser.js
import React from 'react';
import { silentAuth } from './src/auth/auth';

class SessionCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    handleCheckSession = () => {
        this.setState({ loading: false });
    };

    componentDidMount() {
        silentAuth(this.handleCheckSession);
    }

    render() {
        return this.state.loading === false && <>{this.props.children}</>;
    }
}

export const wrapRootElement = ({ element }) => <SessionCheck>{element}</SessionCheck>;
