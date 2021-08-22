import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import $ from 'jquery';

class Contract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contractAddress: this.props.contract,
            error: null,
            account: null,
            balance: 0,
            totalSupply: 0,
            name: '',
            symbol: '',
            methods: []
        };
    }

    componentDidMount() {
        var contractAddress = this.props.contract;
        this.setState({contractAddress: contractAddress});
        const web3 = new Web3(Web3.givenProvider);
        this.loadContract(web3, contractAddress); 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.contract !== this.props.contract) {
            console.log("Contract changed...");
            var contractAddress = this.props.contract;
            this.setState({contractAddress: contractAddress});
            const web3 = new Web3(Web3.givenProvider);
            this.loadContract(web3, contractAddress);
        }
    }

    componentWillUnmount() {
    }
    
    async callMethod(method) {
        try {
            const web3 = new Web3(Web3.givenProvider);
            const address = this.state.contractAddress;
            var apiUrl = `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=6KDDP6WP2M344Y6IJAW98XW5I5TGFVTJVM`;
            console.log(apiUrl);
            var ABI = await $.getJSON(apiUrl);
            if (ABI.message == 'NOTOK') {
                this.setState({error: ABI.result});
            } else {
                var contract = new web3.eth.Contract(JSON.parse(ABI.result), address);
                var result = await contract.methods[method]().call();
                console.log(result);
                alert(result);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async loadContract(web3, address) {
        try {
            var apiUrl = `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=6KDDP6WP2M344Y6IJAW98XW5I5TGFVTJVM`;
            console.log(apiUrl);
            var ABI = await $.getJSON(apiUrl);
            if (ABI.message == 'NOTOK') {
                this.setState({error: ABI.result});
            } else {
                var contract = new web3.eth.Contract(JSON.parse(ABI.result), address);
                var accounts = await web3.eth.getAccounts();
                var balanceOf = await contract.methods.balanceOf(accounts[0]).call();
                var totalSupply = await contract.methods.totalSupply().call();
                var name = await contract.methods.name().call();
                var symbol = await contract.methods.symbol().call();
                var methods = Object.keys(contract.methods).sort().filter(x=>!x.startsWith('0x')&&x.includes('('));
                this.setState({
                    account: accounts[0], 
                    totalSupply: totalSupply,
                    balance: balanceOf,
                    name: name,
                    symbol: symbol,
                    methods: methods,
                    error: null
                });
            }
        } catch (error) {
            this.setState({error: error.message});
        }
    };

    render() {
        if (this.state.contractAddress != '') {
            if (!this.state.error) {
                const listItems = this.state.methods.map(
                    method =>
                    {
                        if (method.includes("()")) {
                            return <li key={method}>
                                <a href="#" onClick={() => this.callMethod(method)}>
                                    {method}
                                </a>
                            </li>;
                        } else {
                            return <li key={method}>{method}</li>;
                        }
                    }
                );
                const scrollStyle = {
                    height: '300px',
                    overflowY: 'auto',
                };
                return (
                    <div class="card">
                        <div class="card-header">
                            <strong>Data for {this.state.contractAddress} ({this.state.symbol})</strong>
                        </div>
                        <div class="card-body">
                            <strong>Name:</strong> {this.state.name} ({this.state.symbol})<br/>
                            <strong>Account:</strong> {this.state.account}<br/>
                            <strong>Balance:</strong> {this.state.balance}<br/>
                            <strong>Total Supply:</strong> {this.state.totalSupply}<br/>
                            <strong>Methods:</strong>
                            <ul style={scrollStyle}>
                                {listItems}
                            </ul>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div class="alert alert-danger">
                        {this.state.error}
                    </div>
                );
            }
        } else {
            return (
                <div class="alert alert-warning">
                    Type something.
                </div>
            );
        }
    }
}

export default Contract