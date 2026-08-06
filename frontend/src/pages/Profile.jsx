import { useState } from "react";
import useAuth from "../hooks/useAuth";
import API from "../services/api";
import "../css/Profile.css";


export default function Profile() {


    const { user } = useAuth();


    const [name, setName] = useState(
        user?.name || ""
    );


    const [edit, setEdit] = useState(false);



    const updateProfile = async()=>{


        try {


            await API.put(
                `/users/update/${user.id}`,
                {
                    name:name
                }
            );


            alert(
                "Profile updated successfully"
            );


            setEdit(false);


        }
        catch(error){

            console.log(error);

            alert(
                "Profile update failed"
            );

        }


    };






    return (

        <div className="profile-page">


            <div className="profile-card">



                <div className="profile-header">



                    <div className="avatar-large">


                        {
                            user?.profileImage ?

                            (
                                <img
                                src={user.profileImage}
                                alt="profile"
                                />
                            )

                            :

                            (

                                user?.name
                                ?.charAt(0)
                                ?.toUpperCase()

                            )

                        }


                    </div>





                    <div>


                        {
                            edit ?

                            (

                                <input
                                value={name}
                                onChange={
                                    e=>
                                    setName(e.target.value)
                                }
                                />

                            )

                            :

                            (

                                <h2>
                                    {user?.name}
                                </h2>

                            )

                        }




                        <p>
                            {user?.email}
                        </p>



                        <span className="role-badge">

                            {user?.role}

                        </span>



                    </div>


                </div>







                <div className="profile-grid">



                    <div className="info-card">

                        <h4>User ID</h4>

                        <p>
                            {user?.id}
                        </p>

                    </div>






                    <div className="info-card">

                        <h4>Email</h4>

                        <p>
                            {user?.email}
                        </p>

                    </div>






                    <div className="info-card">

                        <h4>Role</h4>

                        <p>
                            {user?.role}
                        </p>

                    </div>







                    <div className="info-card">

                        <h4>Created At</h4>

                        <p>
                            {
                            user?.createdAt
                            }
                        </p>

                    </div>







                    <div className="info-card">

                        <h4>Last Login</h4>

                        <p>
                            {
                            user?.lastLogin || 
                            "First Login"
                            }
                        </p>

                    </div>







                    <div className="info-card">

                        <h4>Status</h4>

                        <p>
                            Active
                        </p>

                    </div>



                </div>







                {

                edit ?

                (

                    <button
                    className="edit-btn"
                    onClick={updateProfile}
                    >

                        Save Profile

                    </button>

                )

                :

                (

                    <button
                    className="edit-btn"
                    onClick={()=>
                    setEdit(true)}
                    >

                        Edit Profile

                    </button>

                )

                }




            </div>


        </div>

    );

}