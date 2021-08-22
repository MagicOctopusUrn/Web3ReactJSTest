import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock.js';

class Heading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            selected: 'Home'
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <header class="p-3 bg-dark text-white">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" class="nav-link px-2 text-white"><Clock/></a></li>
                            <li>
                                <a href="#" 
                                    class={this.state.selected == 'Home' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}
                                    onClick={() => this.setState({selected:'Home'})}>
                                       Home
                                </a>
                            </li>
                            <li>
                                <a href="#" 
                                    class={this.state.selected == 'Menu 1' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}
                                    onClick={() => this.setState({selected:'Menu 1'})}>
                                       Menu 1
                                </a>
                            </li>
                            <li>
                                <a href="#" 
                                    class={this.state.selected == 'Menu 2' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}
                                    onClick={() => this.setState({selected:'Menu 2'})}>
                                       Menu 2
                                </a>
                            </li>
                            <li>
                                <a href="#" 
                                    class={this.state.selected == 'Menu 3' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}
                                    onClick={() => this.setState({selected:'Menu 3'})}>
                                       Menu 3
                                </a>
                            </li>
                        </ul>

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                        </form>

                        <div class="text-end">
                            <button type="button" class="btn btn-outline-light me-2">Login</button>
                            <button type="button" class="btn btn-warning">Sign-up</button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Heading