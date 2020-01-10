import React from 'react'

const UserTable = (props) => (

    <table class="uk-table uk-table-divider">
        <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.users.length > 0 ? (
                props.users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>
                            <button onClick={() => { props.editRow(user) }} className="uk-button uk-button-primary uk-button-small"><span uk-icon="pencil"></span></button>
                            <button onClick={() => props.deleteUser(user.id)} className="uk-button uk-button-danger uk-button-small ml-2"><span uk-icon="trash"></span></button>
                        </td>
                    </tr>
                ))
            ) : (
                    <tr>
                        <td colSpan={3}>No users</td>
                    </tr>
                )}
        </tbody>
    </table>
    
)

export default UserTable