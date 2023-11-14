import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Home() {

  const [post, setPost] = React.useState(null);
  const [message, setMessage] = useState(""); 
  const [processing,setProcessing] = useState(false);


  const [headline,setHeadline] = useState("");
  let   [card_img, setCard_img] = useState("");
  const [description, setDescription] = useState("");


   // getting image url
  let handleImgUrl = (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            card_img = reader.result
    }
    reader.readAsDataURL(file)
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try{
      axios.post("https://nazrin-aeee8-default-rtdb.firebaseio.com/homesform.json", {
        id : Date.now(),
        description : description,
        headline: headline,
        card_img: card_img,
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setHeadline("");
            setDescription("");
            setCard_img("");
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
      axios.delete("https://nazrin-aeee8-default-rtdb.firebaseio.com/homesform.json", {
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

    <div className="home-form">
        
        <div className="card">
         <form onSubmit={handleSubmit}>
              <div className="form-title">
            <div className="label">
            <label htmlFor="home-title">Title:</label>  
            <input placeholder="Title.." type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} id="headline" required/>  
            </div>
        </div>

              <div className="label">
              <label htmlFor="description">Content:</label>
              <textarea placeholder="Content.." type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="main_name"  required/>
        </div>
              
              <div className="form-image">
            <div className="label">
                <label className='card_image' htmlFor="card_image">Upload a file:</label>
                <input type="file" accept="image/*,.jpg" onChange={handleImgUrl} id="card_image" required/>    
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

export default Home;
