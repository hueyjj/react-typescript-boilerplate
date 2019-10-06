import * as React from 'react';
import * as ReactDOM from "react-dom";
import "../styles.scss";

import sum from "utils/fight";

interface Props {
   name: string
}

class App extends React.Component<Props> {
  render() {
    return <div>Helo {sum(2, 3) + this.props.name}</div>;
  }
}

var mountNode = document.getElementById("root");
ReactDOM.render(<App name="Jane" />, mountNode);