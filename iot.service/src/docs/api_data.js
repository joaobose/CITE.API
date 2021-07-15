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
    "group": "/Users/pintojoao/Documents/repos/CITE.API/iot.service/src/docs/main.js",
    "groupTitle": "/Users/pintojoao/Documents/repos/CITE.API/iot.service/src/docs/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/onlineWifiDevices/connected",
    "title": "connected",
    "name": "connected",
    "group": "OnlineWifiDevice",
    "version": "1.0.0",
    "description": "<p>Get all the wifi devices that are currently connected to the lab's wifi network that belong to a registered lab's member</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Bearer security token.</p>"
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
            "description": "<p>Returns an array of connected devices</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/online-wifi-device.controller.js",
    "groupTitle": "OnlineWifiDevice"
  }
] });
