import axios from "axios";
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid, CircularProgress} from "@mui/material";
import './App.css';

function App() {
  const [bibleVerse, setBibleVerse] = useState("");
  const bibleURL = "https://bible-api.com/";
  const [bibleInfo, setBibleInfo] = useState<undefined | any>(undefined);

  return (
    <div>
      <div className="search-field">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 color="MediumPurple">
          Bible Verse Searcher
        </h1>
        </div>
        
        
        <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
            id="search-bar"
            className="text"
            value={bibleVerse}
            onChange={(prop: any) => {
              setBibleVerse(prop.target.value);
            }}
            label='Enter a Bible: "Book Chapter:Verse"'
            variant="outlined"
            placeholder="Search..."
            size="small"
            color="secondary" focused
            />
          <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
          >
            <SearchIcon style={{ fill: "secondary" }} />
          </IconButton>
        </div>
      </div>


      {bibleInfo === undefined ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Look up any bible verse, and even ranges of verses by adding a hyphin between verse numbers.<br>
        </br>
        Use the format "Book Chapter:Verse" to find the passage you need!</p>
        </div>
      ) : (
        <div id="Bible-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
          >
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}>
                <Grid item>
                <Box>
                  {bibleInfo?.text ? (<p>
                    <strong>{bibleInfo.reference}</strong>
                    <br />
                    {bibleInfo.text}
                  </p>) : (
                    <CircularProgress />
                  )}
                </Box>
                </Grid>
            </Grid>
        </div>
      )}
      
    </div>
  );

  function search(){
      axios.get(bibleURL + bibleVerse).then((res) => {
        setBibleInfo(res.data);
      });
  }
}

export default App;
