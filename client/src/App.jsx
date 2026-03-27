import { Route, Routes } from 'react-router-dom'
import { HomePage } from './Pages/Homepage'

function App() {
  
  return (
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
    </Routes>
  )
}

export default App
