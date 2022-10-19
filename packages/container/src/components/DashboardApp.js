import { mount } from "dashboard/DashboardApp";
import React, { useRef, useEffect } from "react";
// MarketingApp is exposed in the webpack config file
// mount is a FUNCTION that takes reference to an html element
// we do NOT want it to be a react component, because this could be implemented
// as a Vue, or Angular, or other framework element

// this same pattern applies to any other framework,
// Angular, or Vue as well
export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};
