import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

function App() {

  const [randomCat, setRandomCat] = useState([]);

  const getAnotherRandomCat = async () => {
    setRandomCat([]);
    axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search',
    })
      .then((response) => {
        console.log(response);
        setRandomCat(response?.data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {

    const getRandomCat = async () => {
      axios({
        method: 'get',
        url: 'https://api.thecatapi.com/v1/images/search',
      })
        .then((response) => {
          console.log(response);
          setRandomCat(response?.data);
        })
        .catch(e => {
          console.error(e);
        });
    };

    getRandomCat();
  }, []);

  return (
    <div className="container">
      {
        randomCat.length > 0 ?
          <div className="card text-center d-flex align-items-center justify-content-center border-success" style={{ width: "24rem", height: "34rem" }}>
            <img src={randomCat[0]?.url} className="card-img-top" alt="A random cat" width={250} height={250} />
            <div className="card-body">
              <h5 className="card-title">{randomCat[0].id}</h5>
              <p className="card-text">
                <b>Height:</b><br />
                {randomCat[0].height}<br />
                <b>Width:<br />
                </b> {randomCat[0].width}
              </p>
              <a className="btn btn-primary" onClick={() => getAnotherRandomCat()}>Randomize</a>
            </div>
          </div>
          :
          <div className="card text-center d-flex align-items-center justify-content-center p-0" style={{ width: "24rem", height: "34rem" }}>
            <div className="card text-center d-flex align-items-center justify-content-center p-0" style={{ width: "24rem", height: "34rem" }}>
              <Skeleton variant="rounded" width={260} height={240} />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
              </h5>
              <p className="card-text">
                <b>Height:</b>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <br />
                <b>Width:</b>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </p>
              <a className="btn btn-primary">Loading...</a>
            </div>
          </div>
      }
    </div>
  )
}

export default App
