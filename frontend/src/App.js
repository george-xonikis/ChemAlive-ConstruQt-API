import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import TautomersList from "./Tautomers/TautomersList";
// import {show} from './store/actions/ketcherAction';
// import {hide} from './store/actions/ketcherAction';
import { save } from './store/actions/ketcherAction';
import { saveProject } from './store/actions/projectAction';



String.prototype.parseSDF = function () {
  let sdf = this.split('\n');
  sdf[3] = sdf[3].slice(1);
  sdf = sdf.join('\n');
  return sdf;
};


class App extends Component {

  state = {
    //mol: 'C1=CNC(=O)NC1=O',
    mol: "",
    tautomerData: ''

  };

  componentDidMount() {
    let application = document.querySelector('[role=application]')
    application.hidden = false
    application.style.position = 'absolute'
    application.style.marginTop = '10%'
    application.style.height = '90%'
    application.style.zIndex = '1000'
    this.setState({
      mol: this.props.smiles
    })
  }

  onMolAddHandler = (e) => {
   
    e.preventDefault();

    const smiles = e.target.value;
    this.setState({
      mol: smiles.toUpperCase()
    });
    // console.log(smiles)

    this.props.dispatch(save(smiles))
    // console.log(this.state)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.smiles !== this.state.mol) {
      this.setState({ mol: nextProps.smiles });
    }
  }

  showTheMolsFromSmilesStrings = theString => {
    // console.log("theString", theString)
    window.ketcher.setMolecule(theString);
  };

  getSmilesFunc = () => {
    if (window.ketcher.editor) {
      const smiles = window.ketcher.getSmiles();
      const data = smiles.split(".").join('');
      console.log(data);

      // save SMILES to Redux state
      // this.props.dispatch(saveProject(this.props.project_id, data));

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const URL = 'https://api.chemalive.com';
      console.log(data)
      const body = {
        id: "0",
        method: "readSdf",
        params: {
          apiKey: "v8u96rsgbb6ldqmg",
          substanceIdentifier: `${data}`,
          procedure: "",
          // substanceIdentifier: `Oc1nccc(=O)[nH]1`
        },
        jsonrpc: "2.0"
      };

      const config = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      };
      fetch(URL, config).then(res => res.json()).then(data => {
        console.log(data);

        let sdf;
        if (data.error) {
          alert(data.error.message)
          return;
        }
        if (data.result.tautomers) {
          if (data.result.tautomers.length > 0) {
            sdf = data.result.tautomers[0].molecules[0].correctedConformers[1].sdf;
            const numberOfTTautomers = data.result.tautomers.length;
            console.log("number of tautomers", numberOfTTautomers);
            sdf = sdf.split('\n');
            sdf[3] = sdf[3].slice(1);
            sdf = sdf.join('\n');
            window.ketcher.setMolecule(sdf);
          }

          if (data.result.tautomers.length > 0) {
            const tautomerData = data.result.tautomers.map(tautomer => {
              return {
                smiles: tautomer.achiralSmiles,
                tautomers: tautomer.molecules.map(mol => {
                  return mol.correctedConformers.sort((a, b) => a.energy - b.energy)[0].sdf
                }).join('').parseSDF()
              };
            });

            this.setState({ tautomerData });
            sdf = data.result.tautomers[0].molecules[0].correctedConformers[1].sdf.parseSDF();
            // window.ketcher.setMolecule(sdf);
          }
        }
      });
    }
  };

  getSmilesFuncTwo = () => {
    console.log("searching for", this.state.mol)
    if (window.ketcher.editor) {
      // const smiles = window.ketcher.getSmiles();
      // const data = smiles;
      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const URL = 'https://api.chemalive.com';

      const body = {
        id: "0",
        method: "readSdf",
        params: {
          apiKey: "v8u96rsgbb6ldqmg",
          substanceIdentifier: `${this.state.mol}`,
          procedure: "",
          // substanceIdentifier: `Oc1nccc(=O)[nH]1`
        },
        jsonrpc: "2.0"
      };

      const config = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      };
      fetch(URL, config).then(res => res.json()).then(data => {
        let sdf;
        if (data.error) {
          alert(data.error.message)
          return;
        }
        if (data.result.tautomers) {
          if (data.result.tautomers.length > 0) {
            const tautomerData = data.result.tautomers.map(tautomer => {
              return {
                smiles: tautomer.achiralSmiles,
                tautomers: tautomer.molecules.map(mol => {
                  return mol.correctedConformers.sort((a, b) => a.energy - b.energy)[0].sdf
                }).join('').parseSDF()
              };
            });

            this.setState({ tautomerData });
            sdf = data.result.tautomers[0].molecules[0].correctedConformers[1].sdf.parseSDF();
            window.ketcher.setMolecule(sdf);
          }
        }
      });
    }
  };

  // navToProj = () => {
  //   this.props.history.push('/projects/2')
  // }

  componentWillMount(){
    this.setState({
      mol: this.props.smiles
    })
  }

  render() {
    console.log("the state", this.state)
    console.log("the props", this.props)
    return (
      <>
        <div className="App">
          {/* <button onClick={this.showKetcher}>show ketcher</button> */}

          <div className='smiles-title'>Use SMILES string editor</div>
          <div className='smiles-editor-input'>
            <input
              type="text"
              
              // placeholder={this.props.smiles}
              value={this.state.mol}
              onChange={this.onMolAddHandler}
              style={{
                height: '300px',
                width: '80%'
              }}
            />
            <div className='smile-editor-buttons'>
              <button className='blue-project-button' style={{ margin: '0 20px 0 20px' }} onClick={this.getSmilesFuncTwo}>Run SMILES</button>
              <button className='blue-project-button' onClick={this.getSmilesFunc}>Run from ketcher</button>
            </div>
          </div>
          {/* <button onClick={this.navToProj}>Project</button> */}
          {this.state.tautomerData ?
            <TautomersList
              showTheMolsFromSmilesStrings={this.showTheMolsFromSmilesStrings}
              tatutomers={this.state.tautomerData} /> : ''}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    smiles: state.projectsReducer.smiles,
    project_id: state.projectsReducer.projectProfile.id
  }
};

export default connect(mapStateToProps)(App);
