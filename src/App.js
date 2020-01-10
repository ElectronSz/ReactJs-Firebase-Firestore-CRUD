import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserTable from './views/UserTable'
import NewUser from './components/NewUser'
import EditUser from './components/EditUser'
import Count from './components/Count'
import { db } from './config'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css'

// loads the Icon plugin
UIkit.use(Icons);

const App = () => {

  //init state users list
  const [users, setUsers] = useState([])

  //init state edit user bool
  const [editing, setEditing] = useState(false)

  //init default user object
  const initialFormState = { id: null, name: '', username: '' }

  //init current user state
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const [usersSize, setUsersSize] = useState(0)


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
    setUsersSize(users.length)


  }, [users.length])

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
      console.log("User with ID: " + doc.id + " added succesfully")
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
    <div>
      <div className="container mt-2">
      <div>
        <h2>CRUD App with Hooks and Firebase Firestore</h2>
      </div>
      <hr />
      <div className="row">
      <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <div className="row">
        <div className="col-md-12">
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
        </div>
       
        </div>
        <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <div className="col-md-12">
          <h3>Users List <Count count={usersSize} /></h3>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          
            </div>
        <div className="col-md-6">
         
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default App;


