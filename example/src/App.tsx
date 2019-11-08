import React from 'react'
import logo from './logo.svg'
import './App.css'
import { useConnection, ConnectionProvider } from 'react-detect-offline'

const App: React.FC = () => {
  return (
    <ConnectionProvider poll>
      <Content />
    </ConnectionProvider>
  )
}

function Content() {
  const { online } = useConnection()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {online ? 'Online' : 'Offline'}
      </header>
    </div>
  )
}
export default App
