/** @jsx React.DOM */
(function(){

  var App = React.createClass({
    getDefaultProps: function(){
      return {
        friendList: ["George", "Harris", "Montmorency"]
      };
    },
    getInitialState: function(){
      return {
        selectedFriend: null,
        messageList: [],
        stateHistoryList: []
      };
    },
    onFriendClick: function(friendName){
      this.setState({
        selectedFriend: friendName
      });
    },
    onMessage: function(text){
      this.state.messageList.push({friend: this.state.selectedFriend, text: text});
      this.setState(this.state);
    },
    componentWillUpdate: function(nextProps, nextState){
      var stateCopy = {
        selectedFriend: nextState.selectedFriend,
        messageList: nextState.messageList.map(function(item){
          return {
            friend: item.friend,
            text: item.text
          };
        })
      };

      this.state.stateHistoryList.push(stateCopy);
    },
    runActionLog: function(){
      var stateHistoryList = JSON.parse(window.prompt('Enter json state log'));

      var iterativelySetState = (function (){
        var state = stateHistoryList.shift();
        this.setState(state);

        if(stateHistoryList.length > 0){
          window.setTimeout(iterativelySetState, 500);
        }
      }).bind(this);

      iterativelySetState();
    },
    render: function() {
      var messageList = (this.state.messageList || [])
        .filter(function(item){
          return item.friend == this.state.selectedFriend;
        }.bind(this))
        .map(function(item){
          return item.text;
        });

      return (
        <div>
          <FriendList
            friendList={this.props.friendList}
            selectedFriend={this.state.selectedFriend}
            onFriendClick={this.onFriendClick} />
          <MessageList
            disabled={!this.state.selectedFriend}
            messageList={messageList}
            onMessage={this.onMessage} />
          <div style={{clear:'left'}}>
            <textarea style={{width:'400px', height:'150px'}} value={JSON.stringify(this.state.stateHistoryList)}/>
            <br/>
            <input type="button" value="Run action log" onClick={this.runActionLog}/>
          </div>
        </div>
      );
    }
  });

  var FriendList = React.createClass({
    render: function() {
      var friendList = (this.props.friendList || []).map(function(item, index){
        return (<Friend
          key={index}
          name={item}
          isSelected={this.props.selectedFriend == item}
          onClick={this.props.onFriendClick}/>);
      }.bind(this));

      return (
        <div className="friendList">
          {friendList.length > 0 ? friendList : "You have no friends"}
        </div>
      );
    }
  });

  var Friend = React.createClass({
    clickHandler: function(){
      if (this.props.onClick) {
        this.props.onClick(this.props.name);
      }
    },
    render: function() {
      var classList = React.addons.classSet({
        'friend': true,
        'selected': this.props.isSelected
      });

      return (
        <div className={classList} onClick={this.clickHandler}>
          {this.props.name}
        </div>
      );
    }
  });

  var MessageList = React.createClass({
    getInitialState: function() {
      return {message: ''};
    },
    handleMessageChange: function(event) {
      this.setState({message: event.target.value});
    },
    onKeyDown : function(event) {
      if(event.keyCode==13){
        this.sendMessage();
      }
    },
    sendMessage: function(){
      if (this.props.onMessage) {
        this.props.onMessage(this.state.message);
      }
      
      this.setState({message: ''});
    },
    render: function() {
      var messageList = (this.props.messageList || [])
        .map(function(item){
          return (<div className="msg">{item}</div>);
        });

      return (
        <div className="messageList">
          <div className="messages-container">
            {messageList}
          </div>
          <input type="text" value={this.state.message} onChange={this.handleMessageChange} onKeyDown={this.onKeyDown} disabled={this.props.disabled} />
          <input value="send" type="button" onClick={this.sendMessage} disabled={this.props.disabled}/>
        </div>
      );
    }
  });

  React.render(
    <App />,
    document.getElementById('react')
  );
})();