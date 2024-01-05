import React, { useState } from 'react'
import "./Style.css"

function Search({search,setSearch}) {


  return (
    <div>
<div className="InputContainer">
  <input placeholder="Search by name....." 
  id="input" 
  className="input" 
  name="text" 
  type="text"
  onChange={(e)=> setSearch(e.target.value)}
  />
  
</div>
        
    </div>
  )
}

export default Search