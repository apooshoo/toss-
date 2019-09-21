import React from 'react';

import styles from './style.scss';

class UsersGroups extends React.Component {
  constructor() {
    super();
    this.state = {
        userInput: '',
        suggestions: [],
    };
  }

  componentDidUpdate(){
    console.log("state: ", this.state)
  }

  selectGroup(group){
    this.props.selectGroup(group);
  }

  onUserInput(){
    let userInput = event.target.value;
    this.onUserInputChange(userInput);
  }

  onUserInputChange(userInput){
    let filteredGroups = this.props.usersGroups.filter(group=>{
        return group.groupname.trim().toLowerCase().includes(userInput.trim().toLowerCase());
    });
    this.setState({userInput: userInput, suggestions: filteredGroups});
  }

  render() {

    let usersGroups;
    if(this.props.usersGroups.length > 0 && this.state.suggestions.length === 0){
        usersGroups = this.props.usersGroups.map((group, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{group.groupname}</h6>
                            <button className="btn btn-primary" onClick={()=>{this.selectGroup(group)}}>SELECT</button>
                        </div>

                    </div>
        });
    } else if (this.state.suggestions.length > 0){
        usersGroups = [...this.state.suggestions].map((group, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{group.groupname}</h6>
                            <button className="btn btn-primary" onClick={()=>{this.selectGroup(group)}}>SELECT</button>
                        </div>

                    </div>
        });
    } else if (this.state.suggestions.length === 0 && this.state.userInput.length > 0){
        usersGroups = <p>No results returned.</p>
    }

    return (
      <React.Fragment>
          <div>
            <input type="search" placeholder="Search Groups" className="form-control" value={this.state.userInput} onChange={()=>{this.onUserInput()}}/>
          </div>
          <div>
            {usersGroups}
          </div>
      </React.Fragment>
    );
  }
}

export default UsersGroups;