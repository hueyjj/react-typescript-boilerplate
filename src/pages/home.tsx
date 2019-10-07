import * as React from 'react';
import * as ReactDOM from "react-dom";
import styles from "./home.module.scss";

import sum from "utils/fight";

interface Props {
   name: string
}

class App extends React.Component<Props> {
  render() {
    return <div className={styles.homeContainer}>Hello {sum(2, 3) + this.props.name}</div>;
  }
}

var mountNode = document.getElementById("root");
ReactDOM.render(<App name="Jane" />, mountNode);