import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './LoginScreen.css'

import { useAuthContext } from '../context/reducers/authContext'
import * as actionTypes from '../context/constants/authConstants'

const LoginScreen = () => {
    const {register, handleSubmit, formState: { errors }} = useForm()

    const {dispatch} = useAuthContext()

    const navigate = useNavigate()

    const onSubmit = async (formData) => {
       
        const {data} = await axios.post('/api/auth/login', formData)

        dispatch({type:actionTypes.AUTH, payload:data.data})
    
        navigate('/')

    }

  return (
    <div className='loginscreen' onSubmit={handleSubmit(onSubmit)}>
        <form className='loginscreen__form'>
            <h2 className='loginscreen__title'>Login</h2>
            <p className='loginscreen__subtext'>Don't have an account ? <Link to='/register'>Register</Link></p>
            <div className='form__group'>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' {...register('email', {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} />
                {errors.email?.type === 'required' && <span>Email is required</span>}
                {errors.email?.type === 'pattern' && <span>Email is invalid</span>}
            </div>
            <div className='form__group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password'{...register('password', {required:true, minLength:6})} />
                {errors.password?.type === 'required' && <span>Password is required</span>}
                {errors.password?.type === 'minLength' && <span>Password must be at least 6 characters long</span>}
            </div>

            <div className='form__group'>
                <input type='submit' value='Login'/>
            </div>

            <div className='form__group'>
                <Link to='/forgotpassword'>Forgot Password ?</Link>
            </div>
        </form>
   </div>
  )
}

export default LoginScreen
