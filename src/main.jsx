import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// GitHub Pages (静的ホスティング) ではサーバー側ルーティングが無いため、
// 直接アクセスやリロードでも 404 にならない HashRouter を使用する。
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
