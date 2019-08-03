import React, { Component } from 'react';
import TautomerItem from "./TautomerItem";
import './index.css'

class TautomersList extends Component {
  render() {
    // console.log(this.props.tatutomers);
    return (
      <div>
         <div className='tautomers-title'>Tautomers</div>
      <div className='tautomer-list'>
       
        { this.props.tatutomers.map(tautomer => {
          return <TautomerItem key={tautomer.smiles} tatutomer={ tautomer } showTheMolsFromSmilesStrings={this.props.showTheMolsFromSmilesStrings}/>
        }) }
      </div>
      </div>
    );
  }
}

export default TautomersList;