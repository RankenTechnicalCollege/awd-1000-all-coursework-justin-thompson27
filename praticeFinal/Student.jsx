import React, { useState, useEffect, use } from 'react'

function Student(props) {
  const [editMode,SetEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gradYear, setGradYear] = useState('');


  useEffect(() => {

    setFirstName(props.students.firstName);
    setLastName(props.students.lastName);
    setEmail(props.students.email);
    setGradYear(props.students.gradYear);

  },[]);


  const saveStudent = () => {
    SetEditMode(false);
    const updatedStudent = {firstName:firstName,lastName:lastName,email:email,gradYear:gradYear,id:props.students.id,image:props.students.image}
    props.updateStudent(updatedStudent);
  }

  return (
    <div>
       <div className='card'>
          <img src={props.students.image} alt="missing image" className='card-image-top mx-auto' />
          {!editMode &&
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>{props.students.firstName}</li>
            <li className='list-group-item'>{props.students.lastName}</li>
            <li className='list-group-item'>{props.students.email}</li>
            <li className='list-group-item'>{props.students.gradYear}</li>
            <button type='button' className='btn btn-danger' onClick={() =>props.removeStudent(props.students)}>Delete Student</button>
            <button type='button' className='btn btn-warning' onClick={() => SetEditMode(true)}>Edit</button>
          </ul>
          }
          {editMode &&  <ul className='list-group list-group-flush'>
            <li className='list-group-item text-center'> <input type="text" className='form-control' value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)}/></li>
            <li className='list-group-item text-center'><input type="text" className='form-control' value={lastName} onChange={(e) => setLastName(e.currentTarget.value)}/></li>
            <li className='list-group-item text-center'><input type="text" className='form-control' value={email} onChange={(e) => setEmail(e.currentTarget.value)}/></li>
            <li className='list-group-item text-center'><input type="text" className='form-control' value={gradYear} onChange={(e) => setGradYear(e.currentTarget.value)}/></li>
            <li className='list-group-item text-center'><button type="button" className='btn btn-secondary' onClick={saveStudent}>Save</button> </li>
            </ul>
            }
        </div>
    </div>
  )
}

export default Student
