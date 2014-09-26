/** @jsx React.DOM */
(function(){

  var App = React.createClass({
    getInitialState: function(){
      return {
        number: 0
      };
    },
    decreaseHandler : function(){
      this.setState({
        number: this.state.number - 1
      });
    },
    increaseHandler : function(){
      this.setState({
        number: this.state.number + 1
      });
    },
    render: function() {
      return (
        <div className="number">
          <input type="button" value="-" onClick={this.decreaseHandler} />
          <TextBox text={this.state.number}/>
          <input type="button" value="+" onClick={this.increaseHandler} />
        </div>
      );
    }
  });

  var TextBox = React.createClass({
    render: function() {
      return (
        <span className="textBox">
          {this.props.text}
        </span>
      );
    }
  });

  React.renderComponent(
    <App />,
    document.getElementById('react')
  );
})();