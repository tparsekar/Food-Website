import React from 'react'

const Contact = () => {
  return (
    <div>
      <h1 className='text-3xl p-4 m-4 font-bold'>Contact Us Page</h1>
      <form>
        <input type='text' className="border border-black p-2 m-2" placeholder='Name'/>
        <input type='text' className="border border-black p-2 m-2" placeholder='Message'/>
        <button className='border border-black p-2 m-2 rounded-lg bg-slate-300'>Submit</button>
      </form>
    </div>
  )
}

export default Contact;
