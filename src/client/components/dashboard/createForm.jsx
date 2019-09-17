import React from 'react';

import styles from './style.scss';

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }



  render() {

    return (
      <React.Fragment>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Group Name" onChange={()=>{this.inputGroupName()}} value={this.state.inputGroupName}/>
            <button className="btn btn-primary" onClick={()=>{this.createGroup()}}>Create Group</button>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateForm;