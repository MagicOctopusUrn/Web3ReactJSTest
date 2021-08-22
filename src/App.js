import Clock from './Components/Clock.js';
import Heading from './Components/Heading.js';
import Wallet from './Components/Wallet.js';
import ContractForm from './Components/Forms/ContractForm.js';

function App() {
  return (
    <div>
      <Heading/>
      <br/>
      <div class="container">
        <div class="row">
          <div class="col col-md-4">
            <Wallet/>
          </div>
          <div class="col col-md-8">
            <ContractForm/>
          </div>
        </div>

        <hr/>

        <small>This app was brought to you by the retards who created ReactJS. May they burn in hell.</small><br/>
      </div>
      <br/>
    </div>
  );
}

export default App;
