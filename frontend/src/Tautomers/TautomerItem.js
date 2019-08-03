import React, { Component } from 'react';
import './index.css'

// const tautomer = {
//   width: '500px',
//   height: '70px',
//   backgroundColor: 'coral',
//   margin: '30px auto',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: '20px',
//   boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
//   cursor: 'pointer'
// };

class TautomerItem extends Component {
  render() {
    // console.log(this.props.tatutomer);
    return (
      <div className='tautomer-card' onClick={ () => this.props.showTheMolsFromSmilesStrings(this.props.tatutomer.tautomers) }>
        <h4>{ this.props.tatutomer.smiles }</h4>
      </div>
    );
  }
}

export default TautomerItem;