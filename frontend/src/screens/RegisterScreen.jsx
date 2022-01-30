import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

import './RegisterScreen.css'

import { useAuthContext } from '../context/reducers/authContext'
import * as actionTypes from '../context/constants/authConstants'

const RegisterScreen = () => {

    const {register, handleSubmit, formState: { errors }} = useForm()

    const {dispatch} = useAuthContext()

    const navigate = useNavigate()

    const onSubmit = async (formData) => {
       
        const {data} = await axios.post('/api/auth/register', formData)

        dispatch({type:actionTypes.AUTH, payload:data.data})
    
        navigate('/')

    }

    return (
        <div className='registerscreen' onSubmit={handleSubmit(onSubmit)}>
        <form className='registerscreen__form'>
            <h2 className='registerscreen__title'>Register</h2>
            <p className='registerscreen__subtext'>Already have an account ? <Link to='/login'>Login</Link></p>
            <div className='form__group'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' {...register('username', {required:true})} />
                {errors.username?.type === 'required' && <span>Username is required</span>}
            </div>
            <div className='form__group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' {...register('email', {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} />
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
                <input type='submit' value='Register'/>
            </div>
        </form>
    </div>
    )
}

export default RegisterScreen
