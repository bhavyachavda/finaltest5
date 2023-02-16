import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const  View = ()=>{
    const [recid, setRecid] = useState('')
    const [code, setCode] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [file, setFile] = useState("");
    // const [filename, setFilename] = useState("");
    const [country, setCountry] = useState("");
    let dateadded = new Date().toISOString().slice(0,24)
    
    
    useEffect(()=>{
        setviewdata();
    },[])

    const navigate = useNavigate();
    const setviewdata = async()=>{
        try {
            const eid = localStorage.getItem("view_id");
            console.log("fetch id", eid);
            setRecid(eid);
            console.log(localStorage.getItem("view_id"));
            const req = await axios.get("http://localhost:8000/viewdata",{params:{eid}})
            // console.log(req.data[0].firstname);
            setCode(req.data[0].code);
            setFirstname(req.data[0].firstname);
            setLastname(req.data[0].lastname);
            setEmail(req.data[0].email);
            setGender(req.data[0].gender);
            setHobbies(req.data[0].hobbies);
            setFile(req.data[0].photo);
            // setFilename(req.data[0].filename);
            setCountry(req.data[0].country);
        } catch (error) {
            error.status(404);
        }
    }

    // const handleUpdate = async(e) => {
    //     try {
    //         e.preventDefault();
    //         const req = await axios.get("http://localhost:8000/updateuser",
    //         {params:{recid,code,firstname,lastname,email,gender,hobbies,file,country}})
    //         navigate("/List");
    //     } catch (error) {
            
    //     }

    // };

    //  const saveFile = (e) =>{
    //   setFile(e.target.files[0]);
    //   //  setFilename(e.target.files[0].name)
    //  };
  

    // const gethobbies = (e) => { 
    //     const { value, checked } = e.target
    //     if (checked) { 
    //       setHobbies([...hobbies, value])}
    //        else { 
    //         setHobbies(hobbies.filter((e) => e !== value))
    //       }}

    const handleHome = () =>{
        navigate("/");
    }

    const findImageName = (tData) => {
        console.log(tData);
        if (tData && tData != "") {
          let ansss = tData.split("/");
          ansss = ansss[ansss.length - 1];
          return ansss;
        } else {
          return "download (1).jpg";
        }
      };

    return(
        <div>
            <form>
            <table style={{ "width": "70vw", "marginTop": "1rem", "marginLeft": "2rem" }}>
            <div>
                 <img src={`http://localhost:8000/getimage/${findImageName(file)}`} 
              style={{height:"100px"}}/>
            </div>
               
          <tr>
            <td>
              <label for="code">Code</label>
            </td>
            <td>
              {code}
              {/* <input readOnly={true}
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              /> */}
            </td>
          </tr>
          <tr>
            <td>
              <label for="firstname">Firstname</label>
            </td>
            <td>
              {firstname}
            </td>
          </tr>
          <tr>
            <td>
              <label for="lastname">Lastname</label>
            </td>
            <td>
              {lastname}
            </td>
          </tr>
          <tr>
            <td>
              <label for="email">Email</label>
            </td>
            <td>
              {email}
            </td>
          </tr>
          <tr>
            <td>
              <label for="gender">Gender</label>
            </td>
            <td>
              {gender}
             
            </td>
          </tr>

          <tr>
            <td>
              <label >Hobbies</label>
            </td>
            <td>
              {hobbies}
            </td>
          </tr>

          {/* <tr>
            <td>
              <label for="photo">Photo</label>
            </td>
            <td>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={saveFile}
              />
            </td>
          </tr> */}

          <tr>
            <td>
              <label for="country">Country</label>
            </td>
            <td>{country}
              {/*               
              <select value={country} onChange={(e) => {setCountry(e.target.value);}}>
                <option id="country" value="India" >India</option>
                <option id="country" value="USA">USA</option>
                <option id="country" value="Russia">Russia</option>
                <option id="country" value="Pakistan">Pakistan</option>
                <option id="country" value="China">China</option>
                <option id="country" value="afghanistan">Afghanistan</option>
              </select> */}
            </td>
          </tr>

          <tr>
            <br />
            <br />
            <td>
              <button
                className="btn btn-dark"
                type="button"
                value="Back"
                onClick={handleHome}
              >
                Back
              </button>
              &nbsp;
              {/* <button
                className="btn btn-dark"
                type="submit"
                value="submit"
              >
                Submit
              </button> */}
            </td>
          </tr>
        </table>
            </form>
        </div>
    )   
}

export default View;