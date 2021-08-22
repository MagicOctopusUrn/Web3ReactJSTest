import React from 'react';
import ReactDOM from 'react-dom';
import Contract from '../Contract.js'

class ContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ contract: event.target.value, submitted: false });
    console.log(this.state.contract);
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = document.getElementById('contractInput').value;
    this.setState({ contract: value, submitted:true });
    this.render();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-md-9">
              <label for="contract" class="form-label">Set a Contract</label>
              <input type="text" class="form-control" id="contractInput" value={this.state.contract} onChange={this.handleChange}/>
            </div>
            <div class="col-md-3 text-center">
              <input class="btn btn-md btn-primary" type="submit" value="Submit" id="contractSubmit"/>
            </div>
          </div>
        </form>
        <hr/>
        {
          this.state.submitted && 
          <Contract contract={this.state.contract}/>
        }
        {
          !this.state.submitted && 
          <div class="alert alert-warning">
            Type something.
          </div>
        }
      </div>
    );
  }
}

export default ContractForm;