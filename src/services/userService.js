const { default: httpRequests } = require("utils/httpRequests");

const userService = {
  login: async (username, password, userData = false) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.login",
      params: {
        username: `${username}`,
        password: `${password}`,
        userData: `${userData}`,
      },
      id: 1,
    });
  },
  userUpdateAutoLogin: async (userid, autologin) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.update",
      params: {
        userid: `${userid}`,
        autologin: `${autologin}`,
      },
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  checkAuthentication: async (token) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.checkAuthentication",
      params: {
        sessionid: `${token}`,
      },
      id: 1,
    });
  },
  getUsers: async () => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.get",
      params: {
        output: "extend",
        // "sortfield": "userid"
      },
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  addUser: async (username, password, name, lastname, roleid) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.create",
      params: {
        username: `${username}`,
        passwd: `${password}`,
        name: `${name}`,
        surname: `${lastname}`,
        usrgrps: [
          {
            usrgrpid: "13",
          },
        ],
        roleid: `${roleid}`,
      },
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  updateUser: async (user) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.update",
      params: {
        userid: `${user.userid}`,
        username: `${user.username}`,
        name: `${user.name}`,
        surname: `${user.surname}`,
        usrgrps: [
          {
            usrgrpid: "13",
          },
        ],
        // "autologin": `${user.autologin}`,
        // "autologout": `${user.autologout}`,
        // "refresh": `${user.refresh}`,
        // "rows_per_page": `${user.rows_per_page}`,
        roleid: `${user.roleid}`,
      },
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  updateUserPassword: async (userid, password) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.update",
      params: {
        userid: `${userid}`,
        passwd: `${password}`,
      },
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  deleteUser: async (userid) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.delete",
      params: [`${userid}`],
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  getRole: async (roleid) => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "role.get",
      params: {
        output: ["roleid", "name"],
        roleids: `${roleid}`,
      },
      auth: `${localStorage.getItem("token")}`,
      id: 1,
    });
  },
  logout: async () => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "user.logout",
      params: [],
      id: 1,
    });
  },

  test: async () => {
    return httpRequests.post("", {
      jsonrpc: "2.0",
      method: "usergroup.get",
      params: {
        output: "extend",
      },
      id: 1,
      auth: `${localStorage.getItem("token")}`,
    });
  },
};
export default userService;
