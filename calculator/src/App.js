import { useState } from 'react'

function App() {
  const [ins, setIns] = useState('')
  const [result, setResult] = useState(0)
  const operators = ['%', '/', '*', '-', '+']

  const finish = () => {
    document.getElementById('centro').style.display = 'none'
    document.getElementById('centro-2').style.display = 'none'
    document.getElementById('centro-3').style.display = 'initial'
  }

  const del = (del) => {
    if (ins === '') {
      setIns('')
      setResult('0')
    } else if (del === 'C') {
      setIns('')
      setResult('0')
    } else {
      setIns(ins.slice(0, -1))
      if (!operators.includes(ins.slice(-1))) {
        setResult(result.slice(0, -1))
      }
    }
  }

  const process = (value) => {
    if (
      (operators.includes(value) && ins === '') ||
      (operators.includes(value) && ins.slice(-1) === '.')
    ) {
      return ''
    } else if (operators.includes(value)) {
      if (operators.includes(ins.slice(-1))) {
        setIns(ins.slice(0, -1) + value)
      } else {
        setIns(ins + value)
      }
    } else {
      setIns(ins + value)
    }

    if (!operators.includes(value)) {
      // eslint-disable-next-line no-eval
      setResult(eval(ins + value).toString())
    }
  }

  const Tasto = ({ value }) => {
    let x
    if (value === '×') {
      x = '*'
    } else if (value === '÷') {
      x = '/'
    } else if (value === '−') {
      x = '-'
    } else if (value === '.') {
      x = '.'
    } else {
      x = value
    }
    return (
      <button
        className='btn btn-outline btn-info normal-case'
        onClick={() => process(x.toString())}
      >
        <span className='tasto'>{value}</span>
      </button>
    )
  }
  const Numero = ({ value }) => {
    return (
      <button className='btn' onClick={() => process(value.toString())}>
        {value}
      </button>
    )
  }
  const Tot = () => {
    return (
      <button className='btn btn-success normal-case' onClick={() => finish()}>
        <span className='tasto'>=</span>
      </button>
    )
  }
  const Clear = ({ value }) => {
    return (
      <button className='btn btn-error normal-case' onClick={() => del(value)}>
        {value}
      </button>
    )
  }
  const Schermo = () => {
    return (
      <>
        <div id='centro'>{ins}</div>
        <div id='centro-2'>{result}</div>
        <div id='centro-3'>{result}</div>
      </>
    )
  }
  return (
    <div className='center'>
      <div className='sfondo'>
        <div className='screen'>
          <Schermo />
        </div>
        <span className='main'>
          <Clear value={'C'} />
          <Clear value={'☚'} />
          <Tasto value={'%'} />
          <Tasto value={'÷'} />
          <Numero value={'7'} />
          <Numero value={'8'} />
          <Numero value={'9'} />
          <Tasto value={'×'} />
          <Numero value={'4'} />
          <Numero value={'5'} />
          <Numero value={'6'} />
          <Tasto value={'−'} />
          <Numero value={'1'} />
          <Numero value={'2'} />
          <Numero value={'3'} />
          <Tasto value={'+'} />
          <Numero value={'00'} />
          <Numero value={'0'} />
          <Tasto value={'.'} />
          <Tot value={'='} />
        </span>
      </div>
    </div>
  )
}

export default App
