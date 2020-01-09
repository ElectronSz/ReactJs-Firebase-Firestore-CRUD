import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserTable from './views/UserTable'
import NewUser from './components/NewUser'
import EditUser from './components/EditUser'
import { db } from './config'

const App = () => {

  //init state users list
  const [users, setUsers] = useState([])

  //init state edit user bool
  const [editing, setEditing] = useState(false)

  //init default user object
  const initialFormState = { id: null, name: '', username: '' }

  //init current user state
  const [currentUser, setCurrentUser] = useState(initialFormState)

  //get users from firebase
  const getUsers = () => {
    db.collection('users')
      .onSnapshot(function (querySnapshot) {
        let list = []
        querySnapshot.forEach(function (doc) {
          list.push(doc.data());
        })

        setUsers(list)
      })
  }

  //use effectHook
  useEffect(() => {

    getUsers();

  }, [])

  //add user
  const addUser = user => {

    db.collection('users').add(user).then((doc) => {

      db.collection('users')
        .doc(doc.id)
        .set(
          {
            id: doc.id,
          },
          {
            merge: true,
          }
        )
        console.log("User with ID: "+doc.id+" added succesfully")
    }).catch(error => {
      console.log(error)
    })
  }

  //pass signle user to form
  const editRow = user => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  //update user
  const updateUser = (id, updatedUser) => {
    setEditing(false)

    db.collection('users')
        .doc(id)
        .update(updatedUser);
  }

  //delete user
  const deleteUser = id => {
    db.collection("users")
    .doc(id)
    .delete();
    
  }

  return (
    <div className="container mt-2">
      <div>
        <h2>CRUD App with Hooks and Firebase Firestore</h2>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUser
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h3>Add user</h3>
                <NewUser addUser={addUser} />
              </div>
            )}
        </div>
        <div className="col-md-6">
          <h3>Users List</h3>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App;


