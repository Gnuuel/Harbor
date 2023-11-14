import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Menu() {
    const [post, setPost] = React.useState(null);
    const [message, setMessage] = useState(""); 
    const [processing,setProcessing] = useState(false);
    const [content, setContent] = useState("");
  
  
    const [foodname,setFoodname] = useState("");
    let   [foodimg, setFoodimg] = useState("");
    const [price, setPrice] = useState("");
  
  
     // getting image url
    let handleImgUrl = (e)=>{
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = ()=>{
              foodimg = reader.result
      }
      reader.readAsDataURL(file)
    }
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);
      try{
        axios.post("https://nazrin-aeee8-default-rtdb.firebaseio.com/menuform.json", {
          id : Date.now(),
          price : price,
          content : content,
        foodname: foodname,
          foodimg: foodimg,
        })
        .then((response) => {
          setPost(response.data);
          if (response.status === 200) {
              setProcessing(false);
              setFoodname("");
              setPrice("");
              setContent("");
              setFoodimg("");
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
        axios.delete("https://nazrin-aeee8-default-rtdb.firebaseio.com/menuform.json", {
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
    <div className="App">
        <div className="menu-form">  
        <div className="card">
         <form onSubmit={handleSubmit}>
           
        <div className="form-title">
          <div className="label">
              <label htmlFor="master-title">Food Name:</label>  
              <input placeholder="Food Name.." type="text"  value={foodname} onChange={(e) => setFoodname(e.target.value)} id="roomname" />  
          </div>
          <div className="label">
              <label htmlFor="description">Content:</label>
              <textarea placeholder="Content.."  type="text" value={content} onChange={(e) => setContent(e.target.value)} id="main_name"  required/>
        </div>
          <div className="label">
              <label htmlFor="master-title">Price:</label>  
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="main_name"  placeholder="Price.."/>  
            </div>
        </div>

              
              <div className="form-image">
                
              <div className="label">
              <label className='foodimg' htmlFor="food-img">Upload a file:</label>
              {/* <input type="text" id="home-img-txt" name="name" placeholder="Background Image"/> */}
            <input type="file" accept="image/*,.jpg" onChange={handleImgUrl} id="foodimg" />    
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
  );
}

export default Menu;
