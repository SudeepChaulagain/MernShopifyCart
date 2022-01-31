import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

import './ForgotPasswordScreen.css'

const ForgotPasswordScreen = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const {register, handleSubmit, formState: { errors }} = useForm()

    const onSubmit = async (formData) => {
        try {
            
            const {data} = await axios.post('/api/auth/forgotpassword', formData)

            setSuccess(data.data)

        } catch (error) {
            setError(error.response.data.message)
            
            setTimeout(() => {
                setError('')
            }, 5000)
        }

    }
    return (
        <div className='forgotpasswordscreen' onSubmit={handleSubmit(onSubmit)}>
            <form className='forgotpasswordscreen__form'>
                <h2 className='forgotpasswordscreen__title'>Forgot Password</h2>
                {error && <span className='forgotpasswordscreen__error'>{error}</span>}
                {success &&  <span className='forgotpasswordscreen__success'>{success}</span> }
                <p className='forgotpasswordscreen__subtext'>Please enter valid email address you registered your account with! We will send you password reset confirmation to this email.</p>

                <div className='form__group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' {...register('email', {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} />
                    {errors.email?.type === 'required' && <span>Email is required</span>}
                    {errors.email?.type === 'pattern' && <span>Email is invalid</span>}
                </div>

                <div className='form__group'>
                    <input type='submit' value='Send Email'/>
                </div>
            </form>
        </div>
  )
}

export default ForgotPasswordScreen
