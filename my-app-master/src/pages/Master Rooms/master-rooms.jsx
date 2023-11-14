import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function MasterRooms() {


  const [post, setPost] = React.useState(null);
  const [message, setMessage] = useState(""); 
  const [processing,setProcessing] = useState(false);


  const [roomname,setRoomname] = useState("");
  let   [roomimg, setRoomimg] = useState("");
  const [price, setPrice] = useState("");


   // getting image url
  let handleImgUrl = (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            roomimg = reader.result
    }
    reader.readAsDataURL(file)
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try{
      axios.post("https://nazrin-aeee8-default-rtdb.firebaseio.com/masterroom.json", {
        id : Date.now(),
        price : price,
        roomname: roomname,
        roomimg: roomimg,
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setRoomname("");
            setPrice("");
            setRoomimg("");
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
      axios.delete("https://nazrin-aeee8-default-rtdb.firebaseio.com/masterroom.json", {
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

    <div className="master-room-form">
        
        <div className="card">
         <form onSubmit={handleSubmit}>
           
        <div className="form-title">
          <div className="label">
              <label htmlFor="master-title">Room Name:</label>  
              <input placeholder="Room Name" type="text"  value={roomname} onChange={(e) => setRoomname(e.target.value)} id="roomname" />  
          </div>
          <div className="label">
              <label htmlFor="master-title">Price:</label>  
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="main_name"  placeholder="Price.."/>  
            </div>
        </div>

              
              <div className="form-image">
                
              <div className="label">
              <label className='roomimg' htmlFor="home-img">Upload a file:</label>
              {/* <input type="text" id="home-img-txt" name="name" placeholder="Background Image"/> */}
            <input type="file" accept="image/*,.jpg" onChange={handleImgUrl} id="roomImg" />    
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

export default MasterRooms;
