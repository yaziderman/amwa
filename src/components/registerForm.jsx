import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class RegisterForm extends Form {

    state = {
        data: {first_name:'', last_name:'', username:'', password: ''},
        errors: {}
    }

    schema = {
        first_name : Joi.string().required().min(3).label('First Name'),
        last_name : Joi.string().required().min(3).label('Last Name'),
        username : Joi.string().email().required().label('Username'),
        password : Joi.string().required().min(5).label('Password')
    }

   
    
    doSubmit = async () => {
        try{    
            console.log("submitted");
            await auth.register(this.state.data);
            window.location = '/';
        } catch ( ex ){
            const errors = { ...this.state.errors};
            errors.username = "Not able to login: " + ex;
            this.setState({errors});
        }
        
    }




    render() { 
        return (
            <div className="">
                <form className="px-4 py-3" onSubmit={ this.handleSubmit }>
                    { this.renderInput('first_name', 'First Name') }
                    { this.renderInput('last_name', 'Last Name') }
                    { this.renderInput('username', 'Username') }
                    { this.renderInput('password', 'Password', 'password') }
                    { this.renderButton("Register") }
                </form>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/login">Have a usser? Login</Link>
            </div>
        );
    }
}
 
export default RegisterForm;