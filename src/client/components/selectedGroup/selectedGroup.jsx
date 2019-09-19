import React from 'react';

import styles from './style.scss';

class SelectedGroup extends React.Component {
  constructor() {
    super();
    this.state = {
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
    // console.log(this.state)
  }

  inputEntry(){
    this.props.inputEntry();
  }


  submitEntry(userId, groupId, entry){
    this.props.submitEntry(userId, groupId, entry);
  }

  setWinningEntry(entry){
    this.props.setWinningEntry(entry)
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



//////////////////////////////////////////////////////////////////////////////AJAX WIN BALANCES START///////////////////////////////////////////////////
//NOTE: AJAX CALLS FINISH LATE, SO I BROKE THEM UP INTO TWO PRESSES-SETTLE and CONFIRMSETTLE
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
///////////////////////////////////////////////////////////////////////////////AJAX WIN BALANCES END////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////GENERATE WEIGHTED RANDOM CHOICE START//////////////////////////////////////////////
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
    //ACTUAL
    let totalBalanceWithFriends = balanceWithFriends.map(balance=>{
        let sumBalancePerUser = balance.reduce((a, b)=>{
            return {winbalance: a.winbalance+b.winbalance};
        });
        // console.log(sumBalancePerUser)
        return sumBalancePerUser
    });
    //ACTUAL
    // console.log(balanceWithFriends)
    console.log("EACH USERS TOTALBALANCEWITHFRIENDS", totalBalanceWithFriends)

    let initWeightPerUser = pool.map(user=>{
        return 100/pool.length;
    });
    console.log(initWeightPerUser);
    let adjustedWeightPerUser = initWeightPerUser.map((weight, index)=>{//------------------------------ROUND DOWN FOR EASY WEIGHTING LATER
        let amountToAdjust = totalBalanceWithFriends[index].winbalance * 3
        return Math.floor(weight - amountToAdjust);
    });
    console.log(adjustedWeightPerUser);
    let totalWeight = adjustedWeightPerUser.reduce((a, b)=>{//-------------------------------------------DENOMINATOR FOR WEIGHTING
        return a + b;
    });
    console.log(totalWeight);
    let sample = adjustedWeightPerUser.map((weight, index)=>{//------------------------------------------ENTRIES MULTIPLIED BY WEIGHT
        let counter = 0;
        let temp = [];
        while (counter < weight){
            temp.push(pool[index].entry);
            counter ++;
        };
        return temp
    });
    let totalSample = sample.reduce((a, b)=>{//-----------------------------------------------------------JOINED ENTRIES
        return a.concat(b)
    })
    console.log(totalSample)
    let randomIndex = Math.floor(Math.random() * totalWeight);//------------------------------------------GENERATED RANDOM INDEX
    let randomEntry = totalSample[randomIndex];//---------------------------------------------------------PULL RANDOM ENTRY
    console.log(randomEntry)

    this.setWinningEntry(randomEntry)



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
        <input value={this.props.entry} onChange={()=>{this.inputEntry()}}/>
        <button onClick={()=>{this.submitEntry(this.props.userId, this.props.selectedGroup.groupid, this.props.entry)}}>Submit Entry</button>
        <h1>{this.props.selectedGroup.groupname}</h1>
        <button onClick={()=>{this.settle()}}>Settle!</button>
        <button onClick={()=>{this.confirmSettle()}}>Confirm Settle!</button>
        <h3>Winning Entry: {this.props.winningEntry}</h3>
        {usersInGroup}
      </React.Fragment>
    );
  }
}

export default SelectedGroup;