import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {

    state = {
        data: {username:'', password: ''},
        errors: {}
    }

    schema = {
        username : Joi.string().required().label('Username'),
        password : Joi.string().required().label('Password')
    }


    doSubmit = async () => {
        try{    
            console.log("submitted");
            const { data } = this.state;
            await auth.authenticate(data.username, data.password);            
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
                    { this.renderInput('username', 'Username') }
                    { this.renderInput('password', 'Password', 'password') }
                    { this.renderButton("Login") }
                </form>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/register">New around here? Sign up</Link>
            </div>
        );
    }
}
 
export default LoginForm;