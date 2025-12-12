import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import './AddStudent.css'


function AddStudent(props) {
  //id, firstName, lastName , email , photo
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [gradYear, setGradYear] = useState();
  

  const doWork = () => {
    const newStudent = {
      "id":nanoid(),
      "firstName":firstName,
      "lastName":lastName,
      "email":email,
      "image":URL.createObjectURL(selectedFile),
      "gradYear":parseInt(gradYear)
    }
    props.addStudent(newStudent)

  }

  const imageUpdate = (evt) =>{
    setSelectedFile(evt.target.files[0])

  }
  return (
    <div className='row mt-5'id='addStudent'>
      <h3>Add Student</h3>
      <div className='col-md-2'>
        <label htmlFor='txtFirstName' className='form-label'>First Name</label>
        <input type='text' id='txtFirstName' placeholder='First Name' className='form-control' onChange={(e) => setFirstName(e.currentTarget.value)} value={firstName}/>
      </div> 
      <div className='col-md-2'>
        <label htmlFor='txtLastName' className='form-label'>Last Name</label>
        <input type='text' id='txtLastName' placeholder='Last Name' className='form-control' onChange={(e) => setLastName(e.currentTarget.value)} value={lastName}/>  
      </div> 
      <div className='col-md-2'>
        <label htmlFor='txtEmail' className='form-label'>Email Address</label>
        <input type='email' id='txtEmail' placeholder='Email Address' className='form-control' onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
      </div> 
      <div className='col-md-2'>
         <label htmlFor='fileUpload' className='form-label'>Student Image</label>
         <input type="file" name='file' id='fileUpload' onChange={imageUpdate} />
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtGradYear' className='form-label'>Graduation Year</label>
        <input type='text' id='txtGradYear' placeholder='Graduation Year' className='form-control' onChange={(e) => setGradYear(e.currentTarget.value)} value={gradYear}/>
      </div> 
      <div className='col-md-2'>
          <button type='button' id='btnAdd' className='btn btn-success btn-lg'onClick={doWork}> Add Student</button>
      </div>
      
    </div>
  )
}

export default AddStudent
