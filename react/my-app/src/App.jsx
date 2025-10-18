
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
function Heading(props){
        return <props.level>{props.children}</props.level>
      }
  return (
    <>
      <Heading level="h2">This is an h2</Heading>
      <Heading level="h3">This is an h3</Heading>
    </>
  )
}

export default App
