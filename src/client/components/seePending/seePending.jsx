import React from 'react';
import style from './style.scss';


class SeePending extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  getUsersFriends(userId){
    this.props.getUsersFriends(userId);
  }

  getInvitesReceived(userId){
    this.props.getInvitesReceived(userId);
  }

  acceptInvite(userSentFromId, userReceivingId){
    this.props.acceptInvite(userSentFromId, userReceivingId);
  }

  deleteFriend(userId, friendId){
    this.props.deleteFriend(userId, friendId);
  }

  componentDidMount(){
    this.getInvitesReceived(this.props.userId)
  }

//to refresh pendingSent, redo getUsersFriends, to refresh pendingReceived, redo getInvitesReceived

  render() {
    let pendingSent;
    if(this.props.pendingSent.length > 0){
        pendingSent = this.props.pendingSent.map((userSentTo, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{userSentTo.username}</h6>
                            <button className="btn btn-primary" onClick={()=>{this.deleteFriend(this.props.userId, userSentTo.friendid)}}>Cancel</button>
                        </div>
                    </div>
        });
    };

    let pendingReceived;
    if(this.props.pendingReceived.length > 0){
        pendingReceived = this.props.pendingReceived.map((userSentTo, index)=>{
            let userReceivedFrom = this.props.allUsers.find(user=>{
                return user.id = userSentTo.userid;
            });
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{userReceivedFrom.username}</h6>
                            <button className="btn btn-primary" onClick={()=>{this.acceptInvite(userReceivedFrom.id, userSentTo.friendid)}}>Accept</button>
                            <button className="btn btn-primary">Rej(notdone)</button>
                        </div>
                    </div>
        });
    };

    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={()=>{
            this.getUsersFriends(this.props.userId);
            this.getInvitesReceived(this.props.userId);
        }}>Refresh List</button>
        <div className={style.overflow}>
            <h6>Invites Sent</h6>
            <div>
                {pendingSent}
            </div>
        </div>
        <div className={style.overflow}>
            <h6>Invites Received</h6>
            <div>
                {pendingReceived}
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SeePending;