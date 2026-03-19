import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import Header from '../components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
