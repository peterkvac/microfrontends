import { mount } from "auth/AuthApp";
// MarketingApp is exposed in the webpack config file
// mount is a FUNCTION that takes reference to an html element
// we do NOT want it to be a react component, because this could be implemented
// as a Vue, or Angular, or other framework element

import React, { useRef, useEffect } from "react";

import { useHistory } from "react-router-dom";

// this same pattern applies to any other framework,
// Angular, or Vue as well
export default ({ onSignIn }) => {
  const ref = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // destructure pathname and rename it to nextPathname
      // from the location object
      // communicate this change UP to container
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
