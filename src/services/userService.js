const { default: httpRequests } = require("utils/httpRequests");

const userService = {
  login: async (username, password, userData = false) => {
    return httpRequests.post('', {
        "jsonrpc": "2.0",
        "method": "user.login",
        "params": {
            "username": `${username}`,
            "password": `${password}`,
            "userData": `${userData}`
        },
        "id": 1
    });
  }, 
  userUpdateAutoLogin: async (userid, autologin) => {
    return httpRequests.post('', {
        "jsonrpc": "2.0",
        "method": "user.update",
        "params": {
            "userid": `${userid}`,
            "autologin": `${autologin}`,
        },
        "auth": `${localStorage.getItem("token")}`,
        "id": 1
    });
  },
  checkAuthentication: async (token) => {
    return httpRequests.post('', {
        "jsonrpc": "2.0",
        "method": "user.checkAuthentication",
        "params": {
            "sessionid": `${token}`
        },
        "id": 1
    });
  },
  getUsers: async () => {
    return httpRequests.post('', {
        "jsonrpc": "2.0",
        "method": "user.get",
        "params": {
            "output": "extend",
            // "sortfield": "userid"
        },
        "auth": `${localStorage.getItem("token")}`,
        "id": 1
    });
  },
  addUser: async (username, password, name, lastname, roleid) => {
    return httpRequests.post('', {
      "jsonrpc": "2.0",
      "method": "user.create",
      "params": {
          "username": `${username}`,
          "passwd": `${password}`,
          "name": `${name}`,
          "surname": `${lastname}`,
          // "autologin": autologin? 1 : 0,
          // "autologout": autologout? `${autologout}` : 0,
          // "refresh": `${refresh}`,
          // "rows_per_page": `${rowperpage}`,
          "roleid": `${roleid}`
      },
      "auth": `${localStorage.getItem("token")}`,
      "id": 1
  })
  },
  updateUser: async (user) => {
    return httpRequests.post('', {
      "jsonrpc": "2.0",
      "method": "user.update",
      "params": {
          "userid": `${user.userid}`,
          "name": `${user.name}`,
          "surname": `${user.surname}`,
          // "autologin": `${user.autologin}`,
          // "autologout": `${user.autologout}`,
          // "refresh": `${user.refresh}`,
          // "rows_per_page": `${user.rows_per_page}`,
          "roleid": `${user.roleid}`
      },
      "auth": `${localStorage.getItem("token")}`,
      "id": 1
    })
  },
  updateUserPassword: async (userid, password) => {
    return httpRequests.post('', {
      "jsonrpc": "2.0",
      "method": "user.update",
      "params": {
          "userid": `${userid}`,
          "passwd": `${password}`
      },
      "auth": `${localStorage.getItem("token")}`,
      "id": 1
    })
  },
  deleteUser: async (userid) => {
    return httpRequests.post('', {
        "jsonrpc": "2.0",
        "method": "user.delete",
        "params": [
            `${userid}`
        ],
        "auth": `${localStorage.getItem("token")}`,
        "id": 1
    });
  },
  getRole: async (roleid) => {
    return httpRequests.post('', {
      "jsonrpc": "2.0",
      "method": "role.get",
      "params": {
          "output": ["roleid", "name"],
          "roleids": `${roleid}`
      },
      "auth": `${localStorage.getItem("token")}`,
      "id": 1
  });
  },
  logout: async () => {
    return httpRequests.post('', {
        "jsonrpc": "2.0",
        "method": "user.logout",
        "params": [],
        "id": 1
    })
  },

  test: async () => {
    fetch("http://172.31.38.247/zabbix/api_jsonrpc.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{"jsonrpc":"2.0","method":"apiinfo.version","params":[],"id":1}', // Here!
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  },
};

export default userService;
