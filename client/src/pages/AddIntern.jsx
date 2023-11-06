import React from 'react'

function AddIntern() {
  return (
    <div>
        <p>Add Intern</p>
        <form>
            <div>
                <input type='text' placeholder='Name'/>
            </div>
            <div>
                <input type='email' placeholder='email'/>
            </div>
            <div>
                <input type='text' placeholder='batch'/>
            </div>
            <div>
                <button type='submit'>Submit</button>
                <button>sample</button>
            </div>
        </form>
    </div>
  )
}

export default AddIntern