import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { sendRequest, getBalanceQuery } from '../APIs/BitQuery.js';

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            contracts: [],
            selectedContract: null
        };
    }

    componentDidMount() {
        this.loadBlockchainData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedContract != this.state.selectedContract) {
            document.getElementById('contractInput').value = this.state.selectedContract;
            document.getElementById('contractSubmit').click();
        }
    }

    componentWillUnmount() {
    }

    async connectWallet() {
        console.log(this.loadConnection());
    }


    async loadConnection() {
        try {
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.requestAccounts();
            this.setState({ account: accounts[0] });
            this.loadBalanceData();
            return true;
        } catch (error) {
            return false;
        }
    };

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        if (accounts.length > 0) {
            this.setState({ account: accounts[0] });
            this.loadBalanceData();
        }
    }

    async loadBalanceData() {
        const query = getBalanceQuery(this.state.account);
        console.log(query);
        const response = await sendRequest(query);
        console.log(response);
        try {
            const tokens = response.data.ethereum.address[0].balances.map(
                balance =>
                    [balance.currency.address, balance.currency.name, balance.currency.symbol, balance.value]
            );
            console.log(tokens);
            this.setState({ contracts: tokens });
        } catch (error) {
            // fuck you
        }
    }

    render() {
        if (this.state.account) {
            const scrollStyle = {
                height: '500px',
                overflowY: 'auto',
            };
            var listItems;
            if (this.state.contracts) {
                listItems = this.state.contracts.map(
                    (contract) =>
                        <li class="list-group-item" key={contract[0]}>
                            <a href="#" onClick={() => this.setState({ selectedContract: contract[0] })}>
                                <small>{contract[0]}</small>
                            </a>
                            <ul>
                                <li>{contract[1]} ({contract[2]})</li>
                                <li>Balance: {contract[3]}</li>
                            </ul>
                        </li>
                );
            } else {
                listItems = <li class="list-group-item">No tokens found.</li>;
            }
            return (
                <div class="card">
                    <div class="card-body">
                        Account: {this.state.account}
                        <hr />
                        <ul class="list-group" style={scrollStyle}>
                            {listItems}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="alert alert-danger">
                    <button class="btn btn-md btn-primary" onClick={() => this.connectWallet()}>Connect</button>
                    &nbsp;
                    Wallet not currently connected.
                </div>
            );
        }
    }
}

export default Wallet