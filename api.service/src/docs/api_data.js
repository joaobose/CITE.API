define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/docs/main.js",
    "group": "/Users/pintojoao/Documents/repos/CITE.API/api.service/src/docs/main.js",
    "groupTitle": "/Users/pintojoao/Documents/repos/CITE.API/api.service/src/docs/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/token/:token",
    "title": "checkToken",
    "name": "checkToken",
    "group": "Auth",
    "version": "3.0.0",
    "description": "<p>Check if a token exists and it is valid</p>",
    "filename": "src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "login",
    "name": "login",
    "group": "Auth",
    "version": "3.0.0",
    "description": "<p>Login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The the data of the user</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/users/announcement",
    "title": "broadcastAnnouncement",
    "name": "broadcastAnnouncement",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Broadcast an anoucement to a given channel. Only users with the board role can call this method.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "channel",
            "description": "<p>Name of the given channel</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The message to broadcast</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "createUser",
    "name": "createUser",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Creates a user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>A short profile description of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>The id of the User's role on the CITE lab's</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>A reference to the new user</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "deleteUser",
    "name": "deleteUser",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Deletes a user.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>Metadata with the affected rows</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "getAllUsers",
    "name": "getAllUsers",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Get all users</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>The array of users</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id/role",
    "title": "getRole",
    "name": "getRole",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Gets an user's role</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The user's role</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "getUser",
    "name": "getUser",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Get a user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The user</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id/with?relationships=projects,managedProjects,role,applicants",
    "title": "getUserWith",
    "name": "getUserWith",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Gets a user with the requested relationships</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The user with the requested relationships</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "updateUser",
    "name": "updateUser",
    "group": "User",
    "version": "3.0.0",
    "description": "<p>Updates a user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A short profile description of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>A reference to the updated user</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/wifiDevices/",
    "title": "getAllWifiDevices",
    "name": "getAllWifiDevices",
    "group": "WifiDevice",
    "version": "3.0.0",
    "description": "<p>Get all wifiDevices</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
          },
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "x-gateway-secret",
            "description": "<p>The secret attached at the Gateway API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>The array of wifiDevices</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/wifi-device.controller.js",
    "groupTitle": "WifiDevice"
  }
] });
