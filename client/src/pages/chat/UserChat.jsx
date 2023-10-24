import React, { useEffect } from 'react'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'

function UserChat({item, user}) {
    const {recipientUser} = useFetchRecipientUser(item, user);

  return (
    <div>
      <div style={{margin: '15px 0px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span>{recipientUser && recipientUser.user[0].fullname}</span><span>August 5, 1999</span></div>
        <div tyle={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span>Text Message</span> <span>2</span> <span style={{width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'blue', position: 'absolute', right: '10px'}}></span></div>
      </div>
    </div>
  )
}

export default UserChat
