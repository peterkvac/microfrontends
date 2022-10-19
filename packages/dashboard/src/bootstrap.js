import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Mount function to start up the app

const mount = (el) => {
  const app = createApp(Dashboard);

  app.mount(el);
};

// if in development or isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// else we are running through container
// and should export mount function
export { mount };
