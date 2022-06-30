/* import logo from './logo.svg'; */
import './App.css';
import {useState} from 'react';
import data from './Data';
function App() {

  const [user,setUser]=useState({
    name:"",
    email:"",
    address:"",
    mNumber:"",
    country:""
  });
  const [isActive,setActive]=useState(false);
  const [searchTerm,setSearchTerm]=useState("");
  let name,value;
  const getUserData=(e)=>{
      name=e.target.name;
      value=e.target.value;
      setUser({...user/* we are not deleting the previous data */,[name]:value});
      
  }
  const showDiv=(event)=>{
    setActive(current => !current); 
  }
  const searchData=(e)=>{
    getUserData(e);
     /* console.log(e.currentTarget.value); */
     setSearchTerm(e.currentTarget.value);
     console.log(searchTerm);
  }
  const hideDiv=()=>{
    setActive(false);
  }
  const updateInputValue=(val)=>{
       console.log(val);
       setUser({...user,country:val});    
       hideDiv();
  }
  const postData= async (event)=>{
   event.preventDefault();
   const {name,email,address,mNumber,country}=user;  //object destructuring

   if(name && email && address && mNumber && country){
    const res=fetch('https://myform-711d6-default-rtdb.firebaseio.com/formData.json',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        name,
      email,
      address,
      mNumber,
      country
      })
     });
     if(res){
      setUser({
        name:"",
      email:"",
      address:"",
      mNumber:"",
      country:""
      })
      setActive(false);
      alert("Data stored Successfully");
     }
   }else{
   alert("Please Enter Full Data");
   }
   
  }
  return (
       <div className='main' >
        <header className='head'>
          Contact Us
        </header>
        <form className='form' method='POST' autoComplete="off">

          <div className='input'>
             <label htmlFor="Name"> Name</label>
             <input type="text" value={user.name} onChange={getUserData} placeholder="Enter your name" name="name" id="Name"></input>
          </div>
          <div className='input'>
             <label htmlFor="Email">Email</label>
             <input type="email" value={user.email} onChange={getUserData} placeholder="test@gmail.com" name="email" id="Email"></input>
          </div>
          <div className='input'>
             <label htmlFor="Address">Address</label>
             <input type="address" value={user.address} onChange={getUserData} placeholder="Enter your address" name="address" id="Address"></input>
          </div>
       
          <div className='input'>
          <label htmlFor="mobileNumber">Mobile Number</label>
        <input type="number" className='number' value={user.mNumber} onChange={getUserData} placeholder="Enter your number" name="mNumber" id="mobileNumber"></input>
          </div>
          <div className='input'>
             <label htmlFor="country">Country</label>
             <input type="text" onClick={showDiv} value={user.country} onChange={searchData} placeholder="Enter your country" name="country" id="country"></input>
            
             <div className={isActive?'undrop':'drop'} >
            {  data.filter((val)=>{
              if(searchTerm===""){
                return val;
              }else if(val.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
              }
            }).map((val)=>{
              return <h4 onClick={() => updateInputValue(val)} className='optionData' key={val}>{val}</h4>
            })
            }
           
              </div>
          </div>
          
          <div className='inpu'>
          <button className='btn' onClick={postData}>Submit</button>
          </div>
          
      </form>
      </div>
  );
}

export default App;
