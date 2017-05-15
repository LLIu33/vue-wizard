// Route
import Top from "components/Top";
import User from "components/User";
import Repo from "components/Repo";
import Wizard from "components/Wizard";

export default {
  routes: [
    { path: "/", component: Top },
    { path: "/wizard", component: Wizard },
    { path: "/search/user", component: User },
    { path: "/search/repo", component: Repo }
  ]
};
