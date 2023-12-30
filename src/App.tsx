import './App.css'
import { ReactGiphySearchBox } from '../lib/main'

function App() {
  return (
    <div>
      <ReactGiphySearchBox
        apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
        onSelect={item => console.log(item)}
        masonryConfig={[
          { columns: 2, imageWidth: 110, gutter: 5 },
          { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
        ]}
      />
    </div>
  )
}

export default App
