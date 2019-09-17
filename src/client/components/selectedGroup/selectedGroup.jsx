import React from 'react';

import styles from './style.scss';

class SelectedGroup extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  mainMode(){
    this.props.mainMode();
  }



  render() {
    let selectedGroup = this.props.selectedGroup;

    return (
      <React.Fragment>
        <button onClick={()=>{this.mainMode()}}>Back to main</button>
        <p>{selectedGroup.groupname}</p>
      </React.Fragment>
    );
  }
}

export default SelectedGroup;