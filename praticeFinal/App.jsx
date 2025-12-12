import { useState ,useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {nanoid} from 'nanoid'
import AddStudent from './components/AddStudent'
import _ from 'lodash'
import Student from './components/Student'
/* import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons' */

function App() {
 
  const [allStudents, setAllStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keywords,setKeywords] = useState('');
  const[gradYear,setGradYear] = useState('');

  useEffect(() => {

    saveStudents(students);

  },[]);

  const addStudent = (newStudent) => { 
    const updatedStudents = [...allStudents,newStudent];
    saveStudents(updatedStudents)
  }


  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
  }

  const removeStudent = (studentToDelete) =>{
    const updatedStudentArray = allStudents.filter(students => students.id !== studentToDelete.id)
    saveStudents(updatedStudentArray);

  }

  const searchStudents = () =>{
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLocaleLowerCase().split(' ')
    }

    if (gradYear) {
      keywordsArray.push(gradYear.toString())
    }
    if (keywordsArray.length > 0) {
      const searchResults = allStudents.filter(students => {
        for (const word of keywordsArray) {
          if (students.firstName.toLowerCase().includes(word) || students.lastName.toLowerCase().includes(word) || students.gradYear === parseInt(word)) {
            return true;
          }
          
        }
        return false;
    });
    setSearchResults(searchResults);
    }else{
      setSearchResults(allStudents);
    }
  }
  const students = [{
  id: nanoid(),
  firstName: "Ronnie",
  lastName: "Sirett",
  email: "rsirett0@blog.com",
  image: "images/student1.jpg",
  gradYear:2025
}, {
  id: nanoid(),
  firstName: "Westley",
  lastName: "Merlin",
  email: "wmerlin1@xinhuanet.com",
  image: "images/student2.jpg",
  gradYear:2021
  
}, {
  id: nanoid(),
  firstName: "Bab",
  lastName: "Wastall",
  email: "bwastall2@usgs.gov",
  image: "images/student3.jpg",
  gradYear:2026

}, {
  id: nanoid(),
  firstName: "Price",
  lastName: "Lidgett",
  email: "plidgett3@hc360.com",
  image: "images/student4.jpg",
  gradYear:2020

}, {
  id: nanoid(),
  firstName: "Gerik",
  lastName: "Bower",
  email: "gbower4@goodreads.com",
  image: "images/student5.jpg",
  gradYear:2023
}, {
  id: nanoid(),
  firstName: "Anne-marie",
  lastName: "Fey",
  email: "afey5@blog.com",
  image: "images/student6.jpg",
  gradYear:2022
}, {
  id: nanoid(),
  firstName: "Hadlee",
  lastName: "Reddihough",
  email: "hreddihough6@amazon.de",
  image: "images/student7.jpg",
  gradYear:2021
  
}, {
  id: nanoid(),
  firstName: "Brodie",
  lastName: "Blades",
  email: "bblades7@techcrunch.com",
  image: "images/student8.jpg",
  gradYear:2019
}, {
  id: nanoid(),
  firstName: "Hy",
  lastName: "Malthus",
  email: "hmalthus8@biglobe.ne.jp",
  image: "images/student9.jpg",
  gradYear:2018
}, {
  id: nanoid(),
  firstName: "Lurleen",
  lastName: "Davidovich",
  email: "ldavidovich9@tinyurl.com",
  image: "images/student10.jpg",
  gradYear:2017
}]


  return (
   <div className='container'>
    <div className='row' id='allStudents'>
      <h3>Current Students</h3>
      {searchResults && searchResults.map((students) => 
    (<div className='col-lg-2'key={students.id}>
       <Student students={students} removeStudent={removeStudent}/>
      </div>)
    )}

    </div>
    {/*!allStudents && <button type='button' className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>*/}
    <AddStudent addStudent={addStudent}/>
    <div className='row mt-4'id='searchStudents'>
      <h3>Search Students</h3>
      <div className='col-md-4'>
        <label htmlFor="txtKeywords">Search by First Name or Last Name</label>
        <input type="text" className='form-control' placeholder='Justin' onChange={(e) => setKeywords(e.currentTarget.value)} value={keywords}  />
      </div>
      <div className='col-md-4'>
        <select value={gradYear} onChange={(e) => setGradYear(e.currentTarget.value)} className="form-select" >
          <option value=''>Select Year</option>
          {_(allStudents).map(students => students.gradYear).sort().uniq().map(year => <option key ={year} value={year}>{year}</option>).value()}
        </select>
      </div>
      <div className='col-md-4'>
        <button type='button' className='btn btn-primary btn-lg' onClick={searchStudents}>Search Students</button>
      </div>
      



    </div>
   </div>
  )
}

export default App
