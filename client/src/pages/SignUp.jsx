import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';

export default function SignUp() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {

        // keep the previous value
        setFormData({ ...formData, [e.target.id]: e.target.value })

    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            setError(false)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            setLoading(false)
            if (data.success === false) {
                setError(data.error)
                return
            }
            navigate('/sign-in')

        } catch (error) {
            setLoading(false)
            setError("Something went wrong. Please try again.")

        }

    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    onChange={handleChange}
                    type='text'
                    placeholder='Username'
                    id='username'
                    className='bg-slate-100 p-3 rounded-lg'
                />
                <input
                    onChange={handleChange}
                    type='email'
                    placeholder='Email'
                    id='email'
                    className='bg-slate-100 p-3 rounded-lg'
                />
                <input
                    onChange={handleChange}
                    type='password'
                    placeholder='Password'
                    id='password'
                    className='bg-slate-100 p-3 rounded-lg'

                />

                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Already having an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-600 font-semibold'>Sign In</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
}