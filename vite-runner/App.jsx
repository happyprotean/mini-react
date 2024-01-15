import React from './core/React'
function AppFn() {
  return <div id="app">hi mini react</div>
}

function Counter({ num }) {
  return <div>count: {num}</div>
}

function CounterContainer() {
  return <Counter num={1} />
}

function App() {
  return (
    <div id="app">
      <div>
        <div>111</div>
        <div>11</div>
      </div>
      <div>
        <div>222</div>
      </div>
      <Counter num={10} />
      <CounterContainer />
      <Counter num={20} />
    </div>
  )
}

console.log(App)
console.log(AppFn)
export default App
