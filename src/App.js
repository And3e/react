import { useState } from 'react'

function App() {
  const [ins, setIns] = useState('')
  const [result, setResult] = useState(0)
  const [num, setNum] = useState(0)
  const [cp, setCp] = useState(0)
  const operators = ['%', '/', '*', '- ', '-', ' ', '+']
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00']

  const finish = () => {
    let x = result.split(''),
      y = []

    for (let i = 0; i < 18 && i < x.length; i++) {
      y += x[i]
    }

    setIns(y.toString())
  }

  const del = (del) => {
    if (ins === '') {
      setIns('')
      setResult('0')
    } else if (del === 'C') {
      setIns('')
      setResult('0')
      setNum(0)
      setCp(0)
    } else {
      if (ins.charAt(ins.length - 1) === ' ') {
        setIns(ins.slice(0, -2))
      } else {
        setIns(ins.slice(0, -1))
      }

      if (!operators.includes(ins.charAt(ins.length - 1))) {
        setNum(num - 1)
        // eslint-disable-next-line no-eval
        setResult(eval(ins).toString())
      }
    }
  }

  const process = (value) => {
    if (num < 15 || !numbers.includes(value)) {
      if (numbers.includes(value)) {
        if (value === '00') {
          setNum(num + 2)
        } else {
          setNum(num + 1)
        }
      }
      if (!numbers.includes(value)) {
        setNum(0)
      }
      if (value === '.' && ins === '') {
        value = '0' + value
        value = value.toString()
      } else if (value === '- ' && ins === '') {
        setIns(ins + value)
      }

      if (
        (operators.includes(value) && ins === '') ||
        (operators.includes(value) && ins.slice(-1) === '.') ||
        (value === '00' && ins === '') ||
        (value === '0' && ins === '0') ||
        (value === '00' && ins === '0')
      ) {
        return ''
      } else if (operators.includes(value)) {
        setCp(0)
        if (operators.includes(ins.slice(-1))) {
          if (ins.length === 2) {
            if (ins === '- ') {
              setIns(ins)
            } else if (
              operators.includes(ins.slice(-1)) &&
              operators.includes(ins.slice(-2))
            ) {
              setIns(ins.slice(0, -2) + value)
            } else {
              setIns(ins.slice(0, -1) + value)
            }
          } else {
            if (
              operators.includes(ins.slice(-1)) &&
              operators.includes(ins.slice(-2))
            ) {
              setIns(ins.slice(0, -2) + value)
            } else {
              setIns(ins.slice(0, -1) + value)
            }
          }
        } else {
          setIns(ins + value)
        }
      } else {
        setIns(ins + value)
      }

      if (value === '.') {
        setCp(cp + 1)
        if (operators.includes(ins.slice(-1))) {
          setIns(ins)
        } else {
          setIns(ins + value)
        }
      }

      if (!operators.includes(value) && num < 15) {
        if (ins.charAt(0) === '0' && numbers.includes(ins.charAt(1))) {
          setIns(ins.charAt(1) + value)
        }
        // eslint-disable-next-line no-eval
        setResult(eval(ins + value).toString())
      }
    }
  }

  const Tasto = ({ value }) => {
    let x
    if (value === '×') {
      x = '*'
    } else if (value === '÷') {
      x = '/'
    } else if (value === '−') {
      x = '- '
    } else if (value === '.') {
      if (cp === 1) {
        x = ''
      } else {
        x = '.'
      }
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
