import './App.css'
import { Header } from "./components/Header"
import { InputWithButton } from "./components/Escritura"

function App() {
  return (
    <div className="flex justify-center min-h-[100vh] bg-gray-100 dark:bg-neutral-900 overflow-x-hidden">
      <div className='flex flex-col items-center p-4 mx-auto max-w-3xl w-full'>
        <Header/>
        <InputWithButton/>
      </div>
    </div>
  )
}

export default App
