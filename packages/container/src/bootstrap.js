import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// container does not need a mount function
// container will always show itself immediately
// only sub projects need to show themselves conditionally with mount
//

ReactDOM.render(<App />, document.querySelector("#root"));
