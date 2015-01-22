(function(){
  var App = React.createClass({
    getInitialState: function(){
      return {
        number: 0
      };
    },
    decreaseHandler : function(){
      /*You update component's state via setState.*/
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
        /*
        1. All the event handlers will be attached to the DOM
          element associated with the topmost react component.
        2. Parent component's state often becomes child component's prop.
        */
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

  /*Render the component on the page.*/
  React.render(
    <App />,
    document.getElementById('react')
  );
})();