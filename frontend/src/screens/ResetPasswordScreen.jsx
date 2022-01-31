import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import './ResetPasswordScreen.css'

const ResetPasswordScreen = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const {register, handleSubmit, formState: { errors }} = useForm()

    const {token} = useParams()

    const onSubmit = async (formData) => {
        try {
            
            const {data} = await axios.put(`/api/auth/passwordreset/${token}`, formData)

            setSuccess(data.data)

        } catch (error) {
            setError(error.response.data.message)
            
            setTimeout(() => {
                setError('')
            }, 5000)
        }

    }
    return (
        <div className='resetpasswordscreen' onSubmit={handleSubmit(onSubmit)}>
            <form className='resetpasswordscreen__form'>
                <h2 className='resetpasswordscreen__title'>Reset Password</h2>
                {error && <span className='resetpasswordscreen__error'>{error}</span>}
                {success &&  <span className='resetpasswordscreen__success'>{success}</span> }
                <div className='form__group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password'{...register('password', {required:true, minLength:6})} />
                    {errors.password?.type === 'required' && <span>Password is required</span>}
                    {errors.password?.type === 'minLength' && <span>Password must be at least 6 characters long</span>}
                </div>

                <div className='form__group'>
                    <input type='submit' value='Reset Password'/>
                </div>

                {success && <div className='form__group'>
                    <Link to='/login'>Login Again?</Link>
                </div>
                }
            </form>
        </div>
    )
}

export default ResetPasswordScreen
