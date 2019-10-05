import * as React from 'react';
import * as ReactDOM from "react-dom";
import "../styles.scss";

interface Props {
   name: string
}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        Hello {this.props.name}
        <button>Click me!</button>
      </div>
    );
  }
}

var mountNode = document.getElementById("signup");
ReactDOM.render(<App name="signup" />, mountNode);