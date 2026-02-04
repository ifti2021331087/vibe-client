import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const Login = () => {
    const{signIn}=useContext(AuthContext);
    const navigate=useNavigate();
    const location=useLocation();
    const from=location?.state?.from?.pathname || "/";
    const handleLogin = (e) => {
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        
        signIn(email,password)
        .then(()=>{
            navigate(from,{replace:true});
        })
    }


    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered w-full" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6 ">
                                <input 
                                // disabled={disabled} 
                                disabled={false}
                                className="btn btn-primary w-full p-2" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center'><small>New Here? <Link to="/signup">Create an account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;