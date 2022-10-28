import React, {useState} from 'react'
import { Link , useHistory} from 'react-router-dom'

import "./App1.css"


/* 1. usrname 2. email 
3. password
*/

export default function SignUpPage() {
    const history = useHistory();


    const [user , setUser] = useState({
        name : "" ,email : "" , password : ""
    })
    let name , value;
    const handleInputs =(e)=>{
        console.log(e) ;
        name =  e.target.name; //email
        value = e.target.value; //zaidkhan1681@gmail.com
       setUser({... user, [name] : value}) //Here i am storin the data-value to the respected place of variable
    }//hooks setting the value



    //posting data to the database
    const PostData = async(e) =>{
        e.preventDefault(); //preventing from loading  of  dashboard
        //here by using the object destructring we are not getting the data int he form of user.email or user.password 
        //here we are simply fetching the data input by the user
        const {name , email , password} = user //usr.name, user.email, user.pasword, object destructuring

        //putting the data at the backend using fetch
        //porpertiesof fetch is mthiod, header
        //servre doesnt usderdtand json
        const res = await fetch("/api/user/getuser",{
            method : "POST" ,
            header:{
                "Content-Type" :"application/json"
            } ,
            body : JSON.stringify({
                name,
                email,
                password
            })

        });

        //checkign the data inputted by the user
        const data = await res.json();
        if (data.status === 400 || !data){
            window.alert("Invalid Registration")
            console.log("Invalid Registration")

        }
        else{
            window.alert("Registration Success")
            console.log("Registration Success")
            history.push("/dashboard")

        }

    }

    

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form method= "POST" action="/home">
                <p>
                    <label>Username</label><br/> 
                    <input type="text" name="first_name"   onChange={handleInputs}/>
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email"  onChange={handleInputs}/>
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password"  onChange={handleInputs} />
                </p>
                {/* <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p> */}
              <Link to="/dashboard">
                <button className="primary-button" onClick={PostData}>Log in</button>
            </Link>
            </form>
            <footer>
                <p><Link to="/"><button>Back to homepage</button></Link>.</p>
            </footer>
        </div>
    )

}
