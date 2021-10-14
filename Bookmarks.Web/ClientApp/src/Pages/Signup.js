import React, {useState} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const Signup = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const onTextChange = e => {
        const copy = {...formData};
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/account/signup', formData);
        history.push('/login');
    }

    return(
        <div className='row'>
            <div className='col-md-6 offset-md-3 card card-body bg-light'>
                <h3>Sign up for a new account</h3>
                <form onSubmit={onFormSubmit}>
                    <input type='text' name="firstName" placeholder='firstName' onChange={onTextChange} value={formData.firstName} className='form-control'/>
                    <br/>
                    <input type='text' name='lastName' placeholder='lastName' onChange={onTextChange} value={formData.lastName} className='form-control'/>
                    <br/>
                    <input type='text' name='email' placeholder='email' onChange={onTextChange} value={formData.email} className='form-control'/> <br/>
                    <input type='text' name='password' placeholder='password' onChange={onTextChange} value={formData.password} className='form-control'/>
                    <br/>
                    <button className='btn btn-primary'>Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;