import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login, Registration } from './pages'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Registration />} />
                <Route path="/home" element={<>HOME</>} />
                <Route path="/leads" element={<>LEADS</>} />
                <Route path="/perfil" element={<>PERFIL</>} />
            </Routes>
        </Router>
    )
}

export default App
