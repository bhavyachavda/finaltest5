import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import App from "../App";

const Screen = () => {
  const [code, setCode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [country, setCountry] = useState("India");
  let dateadded = new Date().toISOString().slice(0,24)

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click submit");
    try {
     const ans = await uploadFile();
      console.log(ans.data.message);
      axios.get("http://localhost:8000/user", {
        params: {
          code,
          firstname,
          lastname,
          email,
          gender,
          hobbies,
          file:ans.data.message,
          country,
          dateadded,
        }
     
    });
    navigate("/");
    } 
    catch (error) {
      
    }
    
  };

  const handleHome = () => {
    navigate("/");
  };

  const uploadFile = async () =>{
    try {
      console.log(file);
      console.log(filename);
      const formData = new FormData();
      formData.append("file",file);
      formData.append("fileName",filename);
      console.log(formData);
      const res = await axios.post("http://localhost:8000/userimage",formData);
      return res;
    } catch (error) {
      throw "error occur in image upload"
    }
  };
  const saveFile = (e) =>{
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  };


  const gethobbies = (e) => { 
    const { value, checked } = e.target
    if (checked) { 
      setHobbies([...hobbies, value])}
       else { 
        setHobbies(hobbies.filter((e) => e !== value))
      }}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table style={{ "width": "70vw", "marginTop": "1rem", "marginLeft": "2rem" }}>
          <tr>
            <td>
              <label for="code">Code</label>
            </td>
            <td>
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="firstname">Firstname</label>
            </td>
            <td>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="lastname">Lastname</label>
            </td>
            <td>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="email">Email</label>
            </td>
            <td>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="gender">Gender</label>
            </td>
            <td>
              <label for="Male">Male</label>
              <input
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              &nbsp;
              <label for="Female">Female</label>
              <input
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label >Hobbies</label>
            </td>
            <td>
              <label for="Reading">Reading</label>
              <input
                type="checkbox"
                id="Reading"
                name="hobbies"
                value="Reading"
                onChange={gethobbies}
              />
              &nbsp;
              <label for="Travelling">Travelling</label>
              <input
                type="checkbox"
                id="Travelling"
                name="hobbies"
                value="Travelling"
                onChange={gethobbies}
              />
              &nbsp;
              <label for="Music">Music</label>
              <input
                type="checkbox"
                id="Music"
                name="hobbies"
                value="Music"
                onChange={gethobbies}
              />
              &nbsp;
              <label for="Cricket">Cricket</label>
              <input
                type="checkbox"
                id="Cricket"
                name="hobbies"
                value="Cricket"
                onChange={gethobbies}
              />
              &nbsp;
              <label for="Dancing">Dancing</label>
              <input
                type="checkbox"
                id="Dancing"
                name="hobbies"
                value="Dancing"
                onChange={gethobbies}
              />
              &nbsp;
              <label for="Singing">Singing</label>
              <input
                type="checkbox"
                id="Singing"
                name="hobbies"
                value="Singing"
                onChange={gethobbies}
              />
            </td>
          </tr>

          <tr>
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
          </tr>

          <tr>
            <td>
              <label for="country">Country</label>
            </td>
            <td>
              <select value={country} onChange={(e) => {setCountry(e.target.value);}}>
                <option id="country" value="India" >India</option>
                <option id="country" value="USA">USA</option>
                <option id="country" value="Russia">Russia</option>
                <option id="country" value="Pakistan">Pakistan</option>
                <option id="country" value="China">China</option>
                <option id="country" value="afghanistan">Afghanistan</option>
              </select>
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
              <button
                className="btn btn-dark"
                type="submit"
                value="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Screen;
