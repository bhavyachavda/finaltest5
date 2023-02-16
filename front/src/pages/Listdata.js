import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from './assets/images/uparrow.png';
import image2 from './assets/images/downarrow.png'
// import { CSVLink } from "react-csv";

const Listdata = () => {
  const [ans, setAns] = useState([]);
  const [reloadpage, setreloadpage] = useState(false);
  const [currentpage, setCurrentpage] = useState(0);
  const [total, setTotal] = useState(false);
   const [searchdata, setSearchdata] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [dispstatus, setDispstatus] = useState("");
  const [fdata, setFdata] = useState([]);

  useEffect(()=>{
   setAns(fdata);
  },[fdata]);
 
  // const [user, setUser] = useState("");
  // const [search, setSearch] = useState("");
  // const [dateperpage, setDatePerPage] = useState("");
  // const [pageNumber, setPageNumber] = useState("");
  // const [user, setUser] = useState("");
  // const [PageNumber, setPageNumber] = useState("");

  // const usersPerPage = 4;
  // const pagesVisited = pageNumber * usersPerPage;
  // const pageCount = Math.ceil(user.length / usersPerPage);
  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  // headers = [
  //   {label: "Code",key: "code"},
  //   {label: "Firstname",key: "firstname"},
  //   {label: "Lastname",key: "lastname"},
  //   {label: "Email",key: "email"},
  //   {label: "Gender",key: "gender"},
  //   {label: "Hobbies",key: "hobbies"},
  //   {label: "Photo",key: "photo"},
  //   {label: "status",key: "isactive"},
  //   {label: "Dateadded",key: "dateadded"},
  //   {label: "Dateupdated",key: "dateupdated"},
  //   {label: "Endeffdt",key: "endeffdt"},
    
  // ]

  

  const handledata = async () => {
    await axios
      .get("http://localhost:8000/listdata")

      .then((res) => {
        setAns(res.data);
        setTotal(Math.ceil(res.data.length / 3));
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    handledata();
  }, [reloadpage]);

  const findImageName = (tData) => {
    console.log("bhavya", tData);
    if (tData && tData != "") {
      let ansss = tData.split("/");
      ansss = ansss[ansss.length - 1];
      return ansss;
    } else {
      return "download (1).jpg";
    }
  };

  const handleView = (recid) => {
    // e.preventDefault();
    localStorage.setItem("view_id", recid);
    navigate("/View");
  };

  const handleEdit = (recid) => {
    localStorage.setItem("edit_id", recid);
    navigate("/Edit");
  };

  const handleDelete = async (recid) => {
    try {
      console.log("Delete data", recid);
      const req = await axios.get("http://localhost:8000/deletedata", {
        params: { recid },
      });
      setreloadpage(!reloadpage);
    } catch (error) { }
  };

  const handleAdd = () => {
    navigate("/screen");
  };

  // const handleFilter = () => {
  //   navigate("/");
  // };

  const filterFunction = async (e) => {
    e.preventDefault();
    console.log("filter called");
    try {
      const res = await axios.get("http://localhost:8000/filterdata",{params:{searchdata,gender,hobbies,dispstatus}})
      console.log(res);
      console.log(res.data);
      setFdata(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const sortnamea = () => {
     axios.get("http://localhost:8000/sortnamea")
     .then((res) => {
       setAns(res.data);
    }) }
    const sortnamed = () => {
      axios.get("http://localhost:8000/sortnamed")
      .then((res) => {
        console.log(res.data)
        setAns(res.data);
    }) } 
    const sortdatea = () => {
      axios.get("http://localhost:8000/sortdatea")
      .then((res) => {
        console.log(res.data)
        setAns(res.data); 
    }) }
    const sortdated = () => {
      axios.get("http://localhost:8000/sortdated").then((res) => {
      console.log(res.data)
        setAns(res.data); 
    }) 
  }

  // const counted = employees.length;
  // const [pageNumber, setPageNumber] = useState(0);
  // const usersPerPage = 2;
  // const pagesVisited = pageNumber * usersPerPage;
  // const pageCount = Math.ceil(employees.length / usersPerPage);
  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  return (
    <div>
      <input
          type="search"
          placeholder="search"
          value={searchdata}
          onChange={(e) => setSearchdata(e.target.value)}
          style={{ marginTop: "1rem", marginLeft: "1rem" }}
      />
      <button className="btn btn-dark" type="button" onClick={filterFunction}>Search</button>
      
      <button
        type="button"
        value="Add User"
        onClick={() => {
          handleAdd();
        }}
        className="btn btn-dark"
        style={{ marginTop: "0rem", marginLeft: "1rem" }}
      >
        Add User
      </button>
      {/* <button type="button" value="Export" onClick={()=>{handleFilter()}} className="btn btn-primary" style={ {"marginTop": "5rem","marginLeft": "1rem"}}>
      <CSVLink headers={headers}>Download me</CSVLink>;
        Filter</button> */}
        {/* <button type="button" value="Location" onClick={()=>{handleLocation()}} className="btn btn-info" style={ {"marginTop": "5rem","marginLeft": "1rem"}}>Location</button>  */}
      <table
        className="table table-striped"
        style={{ width: "102vw", marginTop: "1rem", marginLeft: "1rem" }}
      >
        <tbody>
          <tr>
            <th>Recid</th>
            <th>Code</th>
            <th>
              <img style={{height: "20px"}} onClick={sortnamea} src={image1}></img>
              Name<img style={{height: "20px"}} onClick={sortnamed} src={image2}></img></th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Photo</th>
            <th>Country</th>
            <th><img style={{height: "20px"}} onClick={sortdatea} src={image1}></img>Dateadded<img style={{height: "20px"}} onClick={sortdated} src={image2}></img></th>
            <th>Action</th>
          </tr>
          {ans.slice(currentpage*3, currentpage*3+3).map((result) => (
            <tr>
              <td>{result.recid}</td>
              <td>{result.code}</td>
              <td>{result.firstname}</td>
              <td>{result.lastname}</td>
              <td>{result.email}</td>
              <td>{result.gender}</td>
              <td>{result.hobbies}</td>
              <td>
                <img
                  src={`http://localhost:8000/getimage/${findImageName(result.photo)}`}
                  style={{ height: "100px" }}
                />
              </td>
              <td>{result.country}</td>
              <td>{result.dateadded}</td>
              <td>
                <button
                  type="button"
                  value="View"
                  onClick={() => {
                    handleView(result.recid);
                  }}
                  className="btn btn-primary"
                >
                  View
                </button>
                &nbsp;
                <button
                  type="button"
                  value="Edit"
                  onClick={() => {
                    handleEdit(result.recid);
                  }}
                  className="btn btn-warning"
                >
                  Edit
                </button>
                &nbsp;
                <button
                  type="button"
                  value="Delete"
                  onClick={() => {
                    handleDelete(result.recid);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={currentpage == 0}
       onClick={() => { setCurrentpage(currentpage - 1) 
       }}>Prev</button> 
             <button disabled={(currentpage + 1) == total} onClick={() => 
              { setCurrentpage(currentpage + 1)   
                  console.log(currentpage, total)
                   }}>Next</button>
      {/* <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={changePage}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          containerClassName={"pagination"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div> */}
    </div>
  );
};
export default Listdata;
