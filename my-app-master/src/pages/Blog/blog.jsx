
import axios from "axios";
import React, { useEffect, useState } from "react";

function Blog() {

  const [message, setMessage] = useState(""); 
  const [processing,setProcessing] = useState(false);
  let   [blogimg, setBlogimg] = useState("");
  


  const [blogtitle,setBlogtitle] = useState("");
  let   [date, setDate] = useState("");


     // getting image url
     let handleImgUrl = (e)=>{
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = ()=>{
              blogimg = reader.result
      }
      reader.readAsDataURL(file)
    }
  
  
  let dayte = new Date();
  let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug",
  "Sept","Oct","Nov","Dec"];
  let handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try{
      axios.post("https://nazrin-aeee8-default-rtdb.firebaseio.com/blogform.json", {
        id : Date.now(),
        blogtitle: blogtitle,
        month : month[dayte.getMonth()],
        day : dayte.getUTCDay(),
        year : dayte.getFullYear(),
        blogimg:blogimg,
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setBlogtitle("");
            setDate("");
            setBlogimg("");
            alert("the end :)");
            
          } else {
            setMessage("Some error occured");
        }
      });
    }catch (err) {
      console.log(err);
    }

    setPost(null);
    setMessage(null);
    
  };

  let handleclearSubmit = async (e) => {
    try{
      axios.delete("https://nazrin-aeee8-default-rtdb.firebaseio.com/blogform.json", {
      })
      .then((response) => {
        setPost(response.data);
      });
    }catch (err) {
      console.log(err);
    }

    setPost(null);
    setMessage(null);
    
  };

  return (
    <div className='App'>

    <div className="blog-form">
        
        <div className="card">
         <form onSubmit={handleSubmit}>
              <div className="form-title">
            <div className="label">
            <label htmlFor="blog-title">Blog Title:</label>  
            <input placeholder="Title.." type="text" value={blogtitle} onChange={(e) => setBlogtitle(e.target.value)} id="headline" required/>  
            </div>
        </div>

              
        <div className="form-dates">
            <div className="label">
              <label htmlFor="fest-date">Blog Date:</label>
              <input type="date" id="fest-date" value={date} onChange={(e) => setDate(e.target.value)} name="name" placeholder="Blog Date"/>    
            </div>
        </div>
         
        <div className="form-image">
            <div className="label">
                <label className='blogimg' htmlFor="blogimg">Upload a file:</label>
                <input type="file" accept="image/*,.jpg" onChange={handleImgUrl} id="blogimg" required/>    
            </div>
        </div>
        <div className="form-finish">

              { !processing && <button type="submit" className="add-btn">Send</button>} 

              {message ? <p>{message}</p> : null}
              </div>
         </form>
              { !processing && <button type="submit" className="delete-btn" onClick={handleclearSubmit} >Delete</button>} 

         
       </div>
    </div>
    
</div>
)
    
}

export default Blog;
