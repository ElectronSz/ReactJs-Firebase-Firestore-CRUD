import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../config';

function Add() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState(0);


    const savePerson = (evt) => {
        evt.preventDefault();

        db.collection('people').add({
            fname: fname,
            lname: fname,
            age: age
        }).then((doc) => {

            db.collection('people')
              .doc(doc.id)
              .set(
                {
                  id: doc.id,
                },
                {
                  merge: true,
                }
              )
            
              console.log(doc.id)
          }).catch(error => {
            console.log(error)
        })
        console.log(fname)
    }

    
    return (
        <div>
            <div className="row">

                <div className="col-md-6 mt-4">
                    <form className="form" onSubmit={savePerson}>
                        <input value={fname}
                            onChange={e => setFname(e.target.value)} type="text" name="fname" className="form-control" placeholder="First Name" />
                        <input type="text" value={lname}
                            onChange={e => setLname(e.target.value)} name="lname" className="form-control mt-3" placeholder="Last Name" />
                        <input type="text" value={age}
                            onChange={e => setAge(e.target.value)} name="age" className="form-control mt-3" placeholder="Age" />
                        <input type="submit" value="Save" className="form-control mt-3 btn btn-success" />
                    </form>
                </div>

            </div>
        </div>
    );
}


export default Add;