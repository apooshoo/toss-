import React from 'react';
import style from './style.scss';

class UsersFriends extends React.Component {
  constructor() {
    super();
    this.state = {
        userInput: '',
        suggestions: [],
        addFriendMode: false,
    };
  }

  addToGroup(userId, groupId){
    this.props.addToGroup(userId, groupId);
  }

  onUserInput(){
    let userInput = event.target.value;
    this.onUserInputChange(userInput);
  }

  onUserInputChange(userInput){
    let filteredFriends = this.props.usersFriends.filter(friend=>{
        return friend.username.trim().toLowerCase().includes(userInput.trim().toLowerCase());
    });
    this.setState({userInput: userInput, suggestions: filteredFriends});
  }

  setButton(friend){// for usersFriends
    if (this.props.mode === 'main'){
        return <p>btn to do whatever with friend</p>
    } else if(this.props.mode === 'showSelectedGroup'){
        return <button className="btn btn-primary" onClick={()=>{this.addToGroup(friend.id, this.props.selectedGroup.id)}}>Add to group</button>
    }
  }


  render() {

    let usersFriends;
    if(this.props.usersFriends.length > 0 && this.state.userInput.length === 0){
        usersFriends = this.props.usersFriends.map((friend, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{friend.username}</h6>
                            {this.setButton(friend)}
                        </div>
                    </div>
        });
    } else if (this.state.suggestions.length > 0){
        usersFriends = [...this.state.suggestions].map((friend, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{friend.username}</h6>
                            {this.setButton(friend)}
                        </div>
                    </div>
        });
    } else if (this.state.suggestions.length === 0 && this.state.userInput.length > 0){
        usersFriends = <p>No matches found!</p>
    }


    return (
      <React.Fragment>
          <div>
            <input type="search" placeholder="Search your friends" className="form-control" value={this.state.userInput} onChange={()=>{this.onUserInput()}}/>
          </div>
          <div className={style.overflow}>
            {usersFriends}
          </div>
      </React.Fragment>
    );
  }
}

export default UsersFriends;