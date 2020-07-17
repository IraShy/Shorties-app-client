import React from 'react'

function dispatchUser(action, value) {
  switch(action) {
    case "logout": 
      this.setState({ currentUser: false, notes: [] })
      break;
    case "current user":
      this.setState({ currentUser: value })
      break;
    default: 
      console.log("in bookmarks")
  }
}

const Context = React.createContext({
  notes: [],
  dispatchUser: () => {},
  currentUser: false
})

export {
  Context,
  dispatchUser
}