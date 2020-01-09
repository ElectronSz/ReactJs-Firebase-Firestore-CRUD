import React, { useState } from 'react'

const EditUser = props => {

//init user state
  const [user, setUser] = useState(props.currentUser)

  //hnadle input change
  const handleInputChange = event => {
    const { name, value } = event.target

    //add new user to other users
    setUser({ ...user, [name]: value })
  }

  return (
    <form className="form"
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>Name</label>
      <input className="form-control" type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input className="form-control" type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button className="btn btn-primary ml-3 mt-2">Update</button>
      <button onClick={() => props.setEditing(false)} className="btn btn-primary ml-3 mt-2">
        Cancel
      </button>
    </form>
  )
}

export default EditUser