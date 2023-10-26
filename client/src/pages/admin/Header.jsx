import React from 'react'

function Header() {
  return (
    <div>
      <div className="header" style={{height: '50px', width: 'calc(100% - 300px)', marginLeft: '300px', background: 'blue'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span>left side</span>
            <span>right side</span>
        </div>
      </div>
    </div>
  )
}

export default Header
