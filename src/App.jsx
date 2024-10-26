import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef =useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVZXYZabcdefghijklmnopqrstuvzxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*_+"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)

    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  }, [length ,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full h-screen bg-gray-800'>
        <h1 className='bg-yellow-300  text-black text-center text-2xl font-bold font-mono p-4'> Password Generator</h1>

      <div className='lg:w-5/12 sm:w-1/2 m-auto shadow-md rounded-lg overflow-hidden my-16 p-4 bg-slate-600 flex flex-col items-center'>
          <h1 className='text-yellow-300 mb-2 font-semibold text-xl'>Password Generator</h1>
          <div className='w-full flex bg-white rounded-xl '>
            <input type="text" value={password} className='w-full outline-none rounded-xl px-4 border-none' placeholder='Password' ref={passwordRef} />
            <button className='text-white bg-orange-700 rounded-r-lg px-4 p-[5px] font-semibold ' onClick={copyPasswordToClipBoard}>Copy</button>
          </div>


          <div className='flex w-full justify-around mt-4'>
            <div>
              <input type="range" min={6} max={50} value={length}
              className='cursor-pointer w-24 h-[4px] '
              onChange={(e)=>{setLength(e.target.value)}} />
              <label className='ml-1 text-white'>Length:{length}</label>
            </div>

            <div className='mx-4'>
              <input type="checkbox" min={6} max={100} 
              className='cursor-pointer '
              onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
              <label className='ml-1 text-white'>Numbers</label>
            </div>

            <div className=''>
              <input type="checkbox" min={6} max={100} 
              className='cursor-pointer '
              onChange={()=>{setCharAllowed((prev)=>!prev)}} />
              <label className='ml-1 text-white'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
