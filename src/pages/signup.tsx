import * as React from 'react';
import * as ReactDOM from "react-dom";

interface Props {
   name: string
}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        Hello {this.props.name}
        <button>Clck me!</button>
      </div>
    );
  }
}

var mountNode = document.getElementById("signup");
ReactDOM.render(<App name="signup" />, mountNode);