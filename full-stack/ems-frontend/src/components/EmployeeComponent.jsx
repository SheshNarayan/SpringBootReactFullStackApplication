import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');

    const {id} = useParams();
  
    const [errors, setErrors] = useState ({
        firstName :'', lastName :'', email : ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        
         if(id){
            getEmployee(id).then((respose) => {
                setFirstName(respose.data.firstName);
                setlastName(respose.data.lastName);
                setEmail(respose.data.email);
            }).catch(error=>{
                console.log(error);
            }
            )
        }
    }, [id]);

    // function handleFirstName(e){
    //     setFirstName(e.target.value);
    // } //OR ArrowFunction 
 
    // const handleFirstName = (e) =>{
    //         setFirstName(e.target.value);
    // }   OR
    const handleFirstName = (e) => setFirstName(e.target.value);

    // const handleLastName = (e)=> setlastName(e.target.value); used in onClick body
    
    // const handleEmail= (e)=> setEmail(e.target.value);

    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors} // used spread operator to copy error i.e. is state variables

        if(firstName.trim()){
            errorsCopy.firstName='';
        }else{
            errorsCopy.firstName= 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName='';
        }else{
            errorsCopy.lastName= 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email= 'Email is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateEmployee(e){
        e.preventDefault();
       
        if(validateForm()){
            const employee ={firstName, lastName, email}
            console.log(employee);
            
            if(id){
                updateEmployee(id, employee).then((respose) => {
                    console.log(respose.data)
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                })
            }else{
                createEmployee(employee).then((respose)=>{
                    console.log(respose.data);
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'> Update Employee </h2>
        } else{
            return <h2 className='text-center'> Add Employee </h2>
        }
    }

  return (
    <div className='container'>
        <br/> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'> First Name: </label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee First Name'
                            name='fisrtNmae'
                            value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}` }
                            onChange={handleFirstName} //replace with function body
                            >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'> Last Name: </label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Last Name'
                            name='lastName'
                            value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}` }
                            onChange={(e)=> setlastName(e.target.value)}
                            >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'> Email: </label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Email'
                            name='email'
                            value={email}
                            className={`form-control ${errors.email ?'is-invalid' : ''}` }
                            onChange={(e)=> setEmail(e.target.value)}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}> Submit </button>
                    </form>

                </div>
            </div>

        </div>
    </div>
  )
}

export default EmployeeComponent