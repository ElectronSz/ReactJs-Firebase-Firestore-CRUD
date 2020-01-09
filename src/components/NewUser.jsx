import React, { useState } from 'react'

const NewUser = props => {

    //initial state object
    const initialFormState = { id: null, name: '', username: '' }

    //init state
    const [user, setUser] = useState(initialFormState)

    //handle form input change
    const handleInputChange = event => {
       
        //destructure input
        const { name, value } = event.target

        //set user state
        setUser({ ...user, [name]: value })
    }


    return (
        <form className="form"
            onSubmit={event => {
                event.preventDefault()
                if (!user.name || !user.username) return

                props.addUser(user)
                setUser(initialFormState)
            }}>
            <label>Name</label>
            <input className="form-control" type="text" name="name" value={user.name} onChange={handleInputChange} />
            <label>Username</label>
            <input className="form-control" type="text" name="username" value={user.username} onChange={handleInputChange} />
            <button className="btn btn-success mt-3">Add new user</button>
        </form>
    )
}

export default NewUser