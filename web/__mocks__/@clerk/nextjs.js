const React = require('react')

const SignedIn = ({ children }) => <div data-testid="signed-in">{children}</div>
const SignedOut = ({ children }) => <div data-testid="signed-out">{children}</div>
const UserButton = ({ afterSignOutUrl }) => <button data-testid="user-button">User</button>

module.exports = {
  SignedIn,
  SignedOut,
  UserButton,
}