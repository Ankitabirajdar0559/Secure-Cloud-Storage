import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import authService from "../services/authService";

import "../css/Login.css";


export default function Login() {


    const navigate = useNavigate();

    const { login } = useAuth();



    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });



    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);





    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };






    const handleSubmit = async (e) => {

        e.preventDefault();


        setLoading(true);

        setError("");



        try {


            const res = await authService.login(formData);



            console.log(
                "LOGIN RESPONSE:",
                res.data
            );




            // Save JWT Token

            localStorage.setItem(
                "token",
                res.data.token
            );






            // Save User Details

            const userData = {


                id: res.data.id,

                name: res.data.name,

                email: res.data.email,

                role: res.data.role


            };





            localStorage.setItem(

                "user",

                JSON.stringify(userData)

            );







            // Update Auth Context

            login(

                res.data.token,

                userData

            );






            navigate("/dashboard");




        }
        catch(err) {


            console.log(err);



            setError(

                err.response?.data?.message ||

                "Invalid Email or Password"

            );


        }
        finally {


            setLoading(false);


        }


    };







    return (


        <div className="login-page">


            <div className="glass-card">



                <h1>
                    Secure Cloud Storage
                </h1>



                <p>
                    Sign in to continue
                </p>






                {
                    error &&

                    <div className="error-box">

                        {error}

                    </div>

                }







                <form onSubmit={handleSubmit}>



                    <input


                        type="email"


                        name="email"


                        placeholder="Email"


                        value={formData.email}


                        onChange={handleChange}


                        required


                    />







                    <div className="password-box">



                        <input


                            type={
                                showPassword
                                ? "text"
                                : "password"
                            }


                            name="password"


                            placeholder="Password"


                            value={formData.password}


                            onChange={handleChange}


                            required


                        />





                        <button


                            type="button"


                            className="eye-btn"


                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }


                        >


                            {
                                showPassword
                                ? "🙈"
                                : "👁"
                            }


                        </button>



                    </div>








                    <button


                        className="login-btn"


                        disabled={loading}


                    >



                        {
                            loading
                            ? "Signing In..."
                            : "Login"
                        }



                    </button>





                </form>








                <div className="register-link">


                    Don't have an account?



                    <Link to="/register">

                        Register

                    </Link>



                </div>





            </div>


        </div>


    );


}