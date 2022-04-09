import currentUser from "./currentUser";
import createUser from "./createUser";
import login from "./login";

export default [...createUser, ...login, ...currentUser];
