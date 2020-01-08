import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../config';
import { Link } from "react-router-dom";

function Home() {

    const [people, setPeople] =  useState([]);


    //get people
    const getPeople = () =>{
        db.collection('people')
        .onSnapshot(function (querySnapshot) {
            let list = []
            querySnapshot.forEach(function (doc) {
                list.push(doc.data());
            })

            setPeople(list)
        })
    }

    //use effect
    useEffect(() => {
        
        getPeople();

      })


    const detelePerson = (data) =>{
        console.log(data)
    }

    const peopleArr = people.map((person) =>
        <tr key={person.id}>
            <td>{person.fname}</td>
            <td>{person.lname}</td>
            <td>{person.age}</td>
            <td>
                <button className="btn btn-primary">Edit</button>
                <button onClick={detelePerson} className="btn btn-danger ml-2">Delete</button>
            </td>
        </tr>

    );

    return (
        <div>
            <Link className="btn btn-success" to="/new">New Person</Link>
            <div className="row">
            
                <div className="col-md-10 mt-4">
                    <table className="table striped bordered hover">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peopleArr}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Home;