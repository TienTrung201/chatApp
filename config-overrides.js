// npm install react-app-rewired --save-dev

// "scripts": {
//     -   "start": "react-scripts start",
//     +   "start": "react-app-rewired start",
//     -   "build": "react-scripts build",
//     +   "build": "react-app-rewired build",
//     -   "test": "react-scripts test",
//     +   "test": "react-app-rewired test",
//         "eject": "react-scripts eject"
//     }
// npm install --save-dev babel-plugin-module-resolver

const { override, useBabelRc } = require("customize-cra");

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc()
);
