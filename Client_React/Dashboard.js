import React,{useEffect,useState} from 'react'
import axios from 'axios';

const Dashboard = () => {
    const [subjects,setSubjects] = useState([]);
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [code,setCode] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:8000/getsubjects').then(
          arr => setSubjects(arr.data)
        )
      },[]);

      const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/addsubject',{subjectid:id,subjectName:name,subjectCode:code}).then(
            arr => setSubjects(arr.data)
        )
      }

      const deleteHandler = id =>{
        axios.delete(`http://localhost:8000/deletesubjects/${id}`).then(
            arr => setSubjects(arr.data)
        )
      }
   return (
    <div>
        <center>
            <h4>Subject Management</h4>
            <p>Add subject Data</p>
            <form onSubmit={submitHandler}>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} 
            placeholder="Subject id"/> <br />
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} 
            placeholder="Subject Name"/> <br />
            <input type="text" value={code} onChange={(e)=>setCode(e.target.value)} 
            placeholder="Subject Code"/> <br />
            <input type="submit"  value="submit"/>

            </form> <br />


           {subjects.map(task => 
           <div key={task._id}>
            <h4 >{task.subjectid} {task.subjectName} {task.subjectCode}</h4> <button onClick={()=> deleteHandler(task._id)}>Delete Subject</button>
           </div>
           )}

        </center>
    </div>
  )
}

export default Dashboard