import Reader from "./components/reader/Reader"

function App() {
  const url = "/alice.epub"

  return (
    <div className="App">
      <Reader url={url}></Reader>
    </div>
  )
}

export default App
