import Reader from "./components/reader/Reader"

function App() {
  const demoUrl = "Flipped.epub"

  return (
    <div className="App">
      <Reader url={demoUrl}></Reader>
    </div>
  )
}

export default App
