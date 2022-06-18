import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetch('http://localhost:5000').then(response => setMessage(response))
  }, [])
  return (
    <div className="App">
      jest wiadomość:
        {message}
    </div>
  );
}

export default App;
