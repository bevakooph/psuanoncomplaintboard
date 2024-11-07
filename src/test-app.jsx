import React, { useState } from 'react';

function TestApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Test Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default TestApp;