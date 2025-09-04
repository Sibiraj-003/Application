//Step one: Import React, Hooks, Axios
//Step two: Backend API URL, Address
//Step three: App Component - Define
//Setp four: Read the Values from Express
//Step five: Render

import React, { useEffect, useState } from "react";
import axios from "axios";

const API="http://localhost:4000";

export default function App(){
  //State Variables to Store
  const [people,setPeople]=useState([]);
  const [form, setform] = useState({name:"", age:""});

  async function load(){
    const res = await axios.get(`${API}`);
    setPeople(res.data);
  }
  useEffect(()=>
  {
    load();
  },[]);

  async function addPerson(e){
    e.preventDefault();

    if(!form.name || !form.age)
      return alert("Enter name & Age");

    const res = await axios.post(`${API}/`,
      {
        name: form.name,
        age:Number(form.age)
        
      }
    );
   }

  //Step five: Return UI
  return(
    <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "auto"}}>
      <h1>List Of People</h1>
      <form onSubmit={addPerson}> 
        <input type="text" placeholder="Enter Name" value={form.name}
        onChange={e => setform({...form, name: e.target.Value})} required/>

        <input type="Number" placeholder="Enter Age" value={form.age}
        onChange={e => setform({...form, age: e.target.Value})} required/>

        <button>Add User</button>

      </form>

    {people.length === 0 ? (
      <p>No People Found.</p>
    ) : (
      <ul>
        {
          people.map((P) => (
            <li  key={P.id} >
            <strong>{P.name}</strong> - age:{P.age}, Roll_No:{P.roll_no},Year:{P.year},Email_ID:{P.email_id},Dept:{P.Department}
            </li>
          ))
        }
      </ul>
    )}
    </div>
  );
}