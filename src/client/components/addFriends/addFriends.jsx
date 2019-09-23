import React from 'react';


class AddFriends extends React.Component {
  constructor() {
    super();
    this.state = {
        userInput: '',
        suggestions: [],
    };
  }

  addFriend(userId, friendId){
    this.props.addFriend(userId, friendId);
  }

  onUserInput(){
    let userInput = event.target.value;
    this.onUserInputChange(userInput);
  }

  onUserInputChange(userInput){
    let filteredUsers = this.props.allUsers.filter(user=>{
        return user.username.trim().toLowerCase().includes(userInput.trim().toLowerCase());
    });
    this.setState({userInput: userInput, suggestions: filteredUsers});
  }


  render() {

    let allUsers;
    if(this.state.suggestions.length > 0){
         allUsers = [...this.state.suggestions].map((user, index) => {
            if(user.id != this.props.userId){
                return <div key={index} className="card">
                            <div className="card-body">
                                <h6 className="card-text">{user.username}</h6>
                                <button className="btn btn-primary" onClick={()=>{this.addFriend(this.props.userId, user.id)}}>Add To Friends</button>
                            </div>
                        </div>
            };
        });
    } else if(this.state.suggestions.length === 0 && this.state.userInput.length > 0){
        allUsers = <p>No matches found!</p>
    }

    return (
      <React.Fragment>
        <div>
            <input type="search" placeholder="Search all users" className="form-control" value={this.state.userInput} onChange={()=>{this.onUserInput()}}/>
        </div>
        <div>
            {allUsers}
        </div>
      </React.Fragment>
    );
  }
}

export default AddFriends;

// <div>
//             <input type="search" placeholder="Search your friends" className="form-control" value={this.state.userInput} onChange={()=>{this.onUserInput()}}/>
//           </div>