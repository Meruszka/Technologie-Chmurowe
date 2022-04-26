import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetch('localhost:3000').then(response => setMessage(response))
  }, [])
  return (
    <div className="App">
      Tutaj jest wiadomość:
        {message}

    </div>
  );
}

export default App;
