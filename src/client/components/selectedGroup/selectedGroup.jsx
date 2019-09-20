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
    console.log(this.state)
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
    if(pool.length <= 1){//------------------------------------------------------------------stop 0 or 1 person settles
        alert('not enough people have participated')
        return
    }

    pool.forEach(user=>{
        let friendPool = pool.filter(friend=>{
            return friend != user;
        });
        friendPool.forEach(friend=>{
            this.getWinBalance(user.userid, friend.userid);
        });
    });

  }
///////////////////////////////////////////////////////////////////////////////AJAX WIN BALANCES END////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////GENERATE WEIGHTED RANDOM CHOICE START//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  confirmSettle(){
    let pool = this.props.usersInGroup.filter(user=>{
        return user.entry != null;
    }); //------------------------------------------------------------------------------------IGNORES USERS THAT DONT CONTRIBUTE ENTRY!----------------------------
    // console.log('participating users', pool);
    let balanceWithFriends = pool.map(user=>{
        // console.log('mapped user:', user)
        let temp = [...this.state.winBalanceArray].filter(balance=>{
            // console.log('mapped balance', balance)
            return balance.userid === user.userid;
        })
        return temp //----------------------------------------------------------------------------RETURNS BALANCES IN THE ORDER OF POOL (ID INC)----------------------
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
    console.log("EACH USERS TOTALBALANCEWITHFRIENDS", totalBalanceWithFriends)//----------------------STILL IN POOL ORDER

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

    this.setWinningEntry(randomEntry);
    let winner = pool.find(user=>{
        return user.entry === randomEntry;
    })
    console.log('WINNER:', winner)
    let losers = pool.filter(user=>{
        return user != winner;
    });
    console.log('losers:', losers);
    losers.forEach(loser=>{//------------------------------------------------------------------------------ADD TO WINNER
        this.updateWinBalance(winner.userid, loser.userid, 1)
    });
    losers.forEach(loser=>{//-------------------------------------------------------------------------------MINUS FROM LOSERS
        this.updateWinBalance(loser.userid, winner.userid, -1)
    })
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////GENERATE RANDOM WEIGHTED CHOICE END//////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////UPDATE WIN BALANCE AFTER SETTLE//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateWinBalance(userId, friendId, value){
    // console.log('updating winBalance');
    var request = new XMLHttpRequest();
    var sgThis = this;

    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      if (responseData === null){
        console.log('didnt update!');
      } else {
        console.log('updated winbalance in DB', responseData);
        let winBalanceArray = [...sgThis.state.winBalanceArray];
        let winBalanceToEdit = winBalanceArray.find(item=>{
            return (item.userid === userId && item.friendid === friendId)
        })
        winBalanceToEdit.winbalance += value;
        console.log('updated winbalance in state', winBalanceToEdit)
        sgThis.setState({winBalanceArray: winBalanceArray})//-------------------------------------------------UPDATES VALUE IN STATE
      }
    });

    let data = {
        userId: userId,
        friendId: friendId,
        value: value
    };
    request.open("POST", `/users/balance`);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////UPDATE WIN BALANCE AFTER SETTLE END///////////////////////////////////////////



  render() {
    // console.log("IN SELECTED GROUP", this.props.usersInGroup)
    let usersInGroup;
    if(this.props.usersInGroup.length != null && this.props.usersInGroup.length > 0){
        usersInGroup = this.props.usersInGroup.map((user, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-title">Name: {user.username}</h6>
                            <p className="card-text">Entry: {user.entry}</p>
                        </div>

                    </div>
        });
    };



    return (
      <React.Fragment>
        <button className="btn btn-primary" style={{display: 'block'}} onClick={()=>{this.mainMode()}}>Back to main</button>



        <h1>{this.props.selectedGroup.groupname}</h1>
        <div className="form-group w-50 mx-auto">
            <input type="text" className="form-control" style={{display:'block'}} placeholder="Entry" value={this.props.entry} onChange={()=>{this.inputEntry()}}/>
            <button className="btn btn-primary" onClick={()=>{this.submitEntry(this.props.userId, this.props.selectedGroup.groupid, this.props.entry)}}>Submit Entry</button>
        </div>

        <button onClick={()=>{this.settle()}}>Settle!</button>
        <button onClick={()=>{this.confirmSettle()}}>Confirm Settle!</button>
        <h3>Winning Entry: {this.props.winningEntry}</h3>
        {usersInGroup}
      </React.Fragment>
    );
  }
}

export default SelectedGroup;