import React from 'react';

import styles from './style.scss';

class SelectedGroup extends React.Component {
  constructor() {
    super();
    this.state = {
        inputEntry: '',
        winBalanceArray: [],
    };
  }

  mainMode(){
    this.props.mainMode();
  }

  componentDidMount(){
    console.log(this.props.selectedGroup.id)

  }

  componentDidUpdate(){
    console.log(this.state)
  }

  inputEntry(){
    this.setState({inputEntry: event.target.value})
  }


  submitEntry(userId, groupId, entry){
    this.props.submitEntry(userId, groupId, entry);
  }

  getWinBalance(userId, friendId){
    console.log('getting winBalance');
    var request = new XMLHttpRequest();
    var dashboardThis = this;

    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      if (responseData === null){
        console.log('no winbalance found!!');
      } else {
        console.log('found winBalance!!');
        console.log('returning winbalance', responseData);
        let winBalanceArray = [...dashboardThis.state.winBalanceArray];
        winBalanceArray.push(responseData);
        dashboardThis.setState({winBalanceArray: winBalanceArray})
        // return responseData
        // responseData.map(friend=>{
        //     dashboardThis.setState({usersFriends: [...dashboardThis.state.usersFriends.concat(friend)]});
        // })
      }
    });


    request.open("GET", `/users/${userId}/${friendId}/balance`);
    request.send();
  }
  //works and breaks respectively
  // var promise = new Promise((resolve, reject)=>{a = 1+2; if(a>1){resolve('yay')}else{reject('broke!')}})
  // var promise2 = new Promise((resolve, reject)=>{a = 1+2; if(a>4){resolve('yay')}else{reject('broke!')}})

//NOTE: AJAX CALLS FINISH LATE, SO I BROKE THEM UP INTO TWO PRESSES
  settle(){
    this.setState({winBalanceArray: []});

    let pool = this.props.usersInGroup.filter(user=>{
        return user.entry != null;
    }); //IGNORES USERS THAT DONT CONTRIBUTE ENTRY!
    console.log('participating users', pool);

    pool.forEach(user=>{
        let friendPool = pool.filter(friend=>{
            return friend != user;
        });
        friendPool.forEach(friend=>{
            console.log('user:', user)
            console.log('friend', friend)
            this.getWinBalance(user.userid, friend.userid);
        });
    });

  }

  confirmSettle(){
    let pool = this.props.usersInGroup.filter(user=>{
        return user.entry != null;
    }); //IGNORES USERS THAT DONT CONTRIBUTE ENTRY!----------------------------
    // console.log('participating users', pool);
    let balanceWithFriends = pool.map(user=>{
        // console.log('mapped user:', user)
        let temp = [...this.state.winBalanceArray].filter(balance=>{
            // console.log('mapped balance', balance)
            return balance.userid === user.userid;
        })
        return temp //RETURNS BALANCES IN THE ORDER OF POOL (ID INC)----------------------
    });
    // console.log(balanceWithFriends);

    //EXAMPLLE
    // let totalBalanceWithFriends = [{winbalance:3}, {winbalance:0}, {winbalance:-3}];
    //EXAMPLE
    let totalBalanceWithFriends = balanceWithFriends.map(balance=>{
        let sumBalancePerUser = balance.reduce((a, b)=>{
            return {winbalance: a.winbalance+b.winbalance};
        });
        // console.log(sumBalancePerUser)
        return sumBalancePerUser
    });
    // console.log(balanceWithFriends)
    console.log("EACH USERS TOTALBALANCEWITHFRIENDS", totalBalanceWithFriends)

    let initPercentagesPerUser = pool.map(user=>{
        return 100/pool.length;
    });
    console.log(initPercentagesPerUser);
    let adjustedPercentagesPerUser = initPercentagesPerUser.map((percentage, index)=>{
        let amountToAdjust = totalBalanceWithFriends[index].winbalance * 3
        return percentage - amountToAdjust;
    });
    console.log(adjustedPercentagesPerUser);
  }

  render() {
    // console.log("IN SELECTED GROUP", this.props.usersInGroup)
    let usersInGroup;
    if(this.props.usersInGroup != null){
        usersInGroup = this.props.usersInGroup.map((user, index)=>{
            return <div key={index}>
                        <p>Name: {user.username}</p>
                        <p>Entry: {user.entry}</p>
                    </div>
        });
    };


    return (
      <React.Fragment>
        <button onClick={()=>{this.mainMode()}}>Back to main</button>
        <input value={this.state.inputEntry} onChange={()=>{this.inputEntry()}}/>
        <button onClick={()=>{this.submitEntry(this.props.userId, this.props.selectedGroup.groupid, this.state.inputEntry)}}>Submit Entry</button>
        <h1>{this.props.selectedGroup.groupname}</h1>
        <button onClick={()=>{this.settle()}}>Settle!</button>
        <button onClick={()=>{this.confirmSettle()}}>Confirm Settle!</button>
        {usersInGroup}
      </React.Fragment>
    );
  }
}

export default SelectedGroup;