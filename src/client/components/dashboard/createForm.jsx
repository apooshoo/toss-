import React from 'react';

import styles from './style.scss';

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  inputGroupName(){
    this.props.inputGroupName();
  }

  createGroup(){
    this.props.createGroup();
  }



  render() {

    return (
      <React.Fragment>
        <div className="form-group w-50 mx-auto">
            <input type="text" className="form-control" placeholder="Group Name" onChange={()=>{this.inputGroupName()}} value={this.state.inputGroupName}/>
            <button className="btn btn-primary w-50" onClick={()=>{this.createGroup()}}>Create Group</button>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateForm;