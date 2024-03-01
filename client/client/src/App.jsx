import { useState } from "react";
import logo from "./assets/Doctorpic.jpg";
import { Modal, Typography, Box, TextField, CircularProgress } from '@mui/material';
import axios from "axios";
import GPTResponse from "./components/GPTResponse";

function App() {

  const [open, setOpen] = useState(false);
  const [prompt,setPrompt]=useState("");
  const [response, setResponse]=useState("");
  const [loading, setLoading]=useState(false);
  // const variable = "give me just posible disease and bullet point";

  const handleOpen = () => {
    setOpen(true);
  }

  

  const handleClose = () => {
    setOpen(false);
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setResponse("");
    setLoading(true);
    const res = await axios.post("http://localhost:3000/chat", {prompt});
    setResponse(res);
    setLoading(false);
    console.log(res);
  }
  return (
    <div className="app">
      <h1 className="aarogya">Health-App</h1>
      <img src={logo}/>
      <button onClick={handleOpen} className="btn">Ask me anything</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Aarogya-modal"
      >
        <Box className="container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Droup Your Question
          </Typography>
          <form style={{display: "flex",flexDirection: "column",alignItems: "center"}} onSubmit={(e) =>{handleSubmit(e)}}>
            <TextField value={prompt} onChange={(e) => setPrompt(e.target.value) } id="outlined-basic" label="Query" variant="outlined" sx={{margin:"15px 0px", width:"100%"}} />
            <button type="submit" className="btn">Submit</button>
          </form>
          {loading && <CircularProgress sx={{margin : "20px 0 0 50%"}} />}
          {response && <GPTResponse response={response} />}
        </Box>
      </Modal>
    </div>
  )
}

export default App
