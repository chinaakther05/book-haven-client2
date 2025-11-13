import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import googlePhoto from '../../assets/icon-google.png';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { name, email, photoURL, password } = formData;

    
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;

    if (!uppercase || !lowercase || !minLength) {
      toast.error(
        'Password must be at least 6 characters long and include uppercase and lowercase letters.'
      );
      return; 
    }

    
    createUser(email, password)
      .then((res) => {
        toast.success(`Registration successful! Welcome, ${name}`);
        
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success(`Welcome ${result.user.displayName}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Toaster position="top-center" />
      <div className="card mx-auto bg-base-200 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold  text-black text-center mb-4">Register now!</h1>
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input text-red input-bordered w-full"
              required
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-black right-2 top-1/2 -translate-y-1/2 btn btn-sm btn-ghost"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full border flex items-center justify-center gap-2 bg-white text-black"
          >
            <img src={googlePhoto} alt="Google logo" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
