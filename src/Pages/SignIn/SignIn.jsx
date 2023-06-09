import React, { useContext, useState } from 'react';
import signUp from '../../assets/images/login/login.svg'
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const SignIn = () => {
    const { googleSignIn, successNotify, errorNotify, emailAndPassSignIn } = useContext(AuthContext)
    const [redirect, setRedirect] = useState(false)


    // handleSignInForm
    const handleSignInForm = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        emailAndPassSignIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            successNotify('Sign in successfully')
            setRedirect(true)
        })
        .catch(error => {
            errorNotify(error.message)
        })
    }

    // handleSignInWithGoogle
    const handleSignInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                successNotify('sign In successfully')

            })
            .catch(error => {
                errorNotify(error.message)
            })
    }
    return (
        <div className="hero min-h-screen bg-white">
            <div className="hero-content gap-8 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={signUp} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body border border-gray-200">
                        <h1 className='text-center text-3xl font-bold text-[#444444]'>Sign In</h1>
                        <form onSubmit={handleSignInForm}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="type your email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="type your email" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#FF3811]">Login</button>
                            </div>
                        </form>
                        <p className='my-4 text-center'>Or Sign In with</p>
                        <div className='flex mx-auto'>
                            <FaFacebook size='2em' className='me-5 text-[#1F80D6]'></FaFacebook>
                            <FaLinkedin size='2em' className='me-5 text-[#0C86E9]'></FaLinkedin>
                            <FaGoogle size='2em' className='me-5 text-[#4F74C0]' onClick={handleSignInWithGoogle}></FaGoogle>
                        </div>
                        <p className='text-center my-4'>Have not account! <Link className='text-[#FF3811]' to='/sign-up'>Sign-up</Link></p>
                        {
                            redirect === true && <>
                            <Navigate to='/' replace={true}></Navigate>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;