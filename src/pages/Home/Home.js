//MY SURVIVOR 3556aece-de07-4868-8268-f646798384de;
import React, { useEffect, useState, useRef } from "react";
import api from "./../../services/api";
import ak47 from "./../../assets/inventory-icons/weapon.png";
import soup from "./../../assets/inventory-icons/Soup.png";
import firstAid from "./../../assets/inventory-icons/red-cross.png";
import water from "./../../assets/inventory-icons/bottledwater.png";
import "./style.css";
import { useHistory } from "react-router-dom";
import music from './../../assets/audio/Gothic Music - The Sealed Kingdom.mp3'
const Home = ({ match }) => {
  
  const history = useHistory()
  const refContainer = useRef(null);
  const [survivors, setSurvivors] = useState([]);
  const[userName,setUserName] =useState('');
  const[doesUserExists,setDoesUserExists] = useState(false);
  const [survivorToFlag, setSurvivorToFlag] = useState("");
  const[survivorFlaggedDisplay,setsurvivorFlaggedDisplay] =useState(false);
  const [survivorNotFlaggedDisplay, setsurvivorNotFlaggedDisplay] = useState(false);
  const [infectedPercentage, setInfectedPercentage] = useState(0);
  const [nonInfectedPercentage, setNonInfectedPercentage] = useState(0);
  const [lostPoints, setLostPoints] = useState(0);
  const [
    averageQtdOfWaterPerSurvivor,
    setaverageQtdOfWaterPerSurvivor,
  ] = useState(0);
  const [
    averageQtdOfAK47PerSurvivor,
    setaverageQtdOfAK47PerSurvivor,
  ] = useState(0);
  const [
    averageQtdOfSoupPerSurvivor,
    setaverageQtdOfSoupPerSurvivor,
  ] = useState(0);
  const [averageQtdOfAidPerSurvivor, setaverageQtdOfAidPerSurvivor] = useState(
    0
  );
   
  async function getInfectedPercetage() {
    const response = await api.get("/reports/infected");
    const percentage = response.data.info;
    setInfectedPercentage(percentage);
  }
  //gerttin average of infected survivors
  useEffect(() => {
    getInfectedPercetage();
  },[survivorFlaggedDisplay]);

  async function getNonInfectedPercetage() {
    const response = await api.get("/reports/noninfected");
    const percentage = response.data.info;
    setNonInfectedPercentage(percentage);
  }
  useEffect(() => {
    getNonInfectedPercetage();
  });
  useEffect(()=>{
   async function checkUserExistance(){

        try{
            const response = await  api.get("/people/"+match.params.id+".json")
            if(response.status==200){
              setDoesUserExists(true);
            }
  
        }catch(e){
            console.log(e);
            history.push('/')
        }
    }
    checkUserExistance()
  },[match.params.id])
  //fetching all survivors
  useEffect(() => {
    async function loadSurvivors() {
      const snd = new Audio(music);
      snd.play();
      const response = await api.get("/people.json");

      setSurvivors(response.data);
    }
    loadSurvivors();
  }, []);
  async function getItemsInfo() {
    const response = await api.get("/report/people_inventory.json");

    setaverageQtdOfAK47PerSurvivor(
      response.data.report.average_quantity_of_each_item_per_person["AK47"]
    );
    setaverageQtdOfSoupPerSurvivor(
      response.data.report.average_quantity_of_each_item_per_person[
        "Campbell Soup"
      ]
    );
    setaverageQtdOfWaterPerSurvivor(
      response.data.report.average_quantity_of_each_item_per_person[
        "Fiji Water"
      ]
    );
    setaverageQtdOfAidPerSurvivor(
      response.data.report.average_quantity_of_each_item_per_person[
        "First Aid Pouch"
      ]
    );
  }

  // feching items information
  useEffect(() => {
    getItemsInfo();
  }, [match.params.id]);

  //get points lost due to infected survivor
  useEffect(() => {
    async function getLostPoints() {
      const response = await api.get("/report/infected_points.json");
      setLostPoints(response.data.report.total_points_lost);
    }
    getLostPoints();
  }, []);

  // fetching user information
  useEffect(() => {
    async function loadUserInfo() {
      try {
        const response = await api.get(
          "/people/" + match.params.id + ".json"
        );
        setUserName(response.data.name);
      } catch (e) {
        console.log(e);
      }
    }
    loadUserInfo();
  }, []);

  function handleFlagForm(e) {
    e.preventDefault();

    const queriedSurvivor = survivors.filter(
      (survivor) => survivor.name === survivorToFlag
    );
    try {
      if (survivorToFlag === "") {
        alert("You need to type a name of a survivor");
      } else if (queriedSurvivor[0].infected === true) {
        alert("Survivor Already Identified as Infected");
      } else {
        const splitLocationString = queriedSurvivor[0].location.split(
          "people/"
        );
        const infectedSurvivorID = splitLocationString[1];
        api.post("/people/" + match.params.id + "/report_infection.json", {
          infected: infectedSurvivorID,
          id: match.params.id,
        });
        setsurvivorFlaggedDisplay(true);
        alert("You Flagged " + survivorToFlag+"! Watch out!");
      }
      setSurvivorToFlag("");
      refContainer.current.focus();
    } catch (e) {
      console.log(e);
      alert("Survivor not Found!");
      setsurvivorFlaggedDisplay(true);
      setSurvivorToFlag("");
      refContainer.current.focus();
    }
  }


  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="navbar">
          <ul className="navbar-links">
            <li className="navbar-link">
              <a
                onClick={(e) => history.push("/" + match.params.id + "/update")}
              >
                UPDATE LOCATION
              </a>
            </li>
            <li className="navbar-link">
              <a
                onClick={(e) => history.push("/" + match.params.id + "/trade")}
                data-testid="tradeItemsLink"
              >
                TRADE ITEMS
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="welcome-message">
      <h1
        style={{
          position: "absolute",
          color: "red",
          textShadow: "1px 1px 1px white",
          fontSize: "40pt",
        }}
      >
        Welcome {userName}
      </h1>
      </div>
      <form className="flag-form" onSubmit={handleFlagForm}>
        <input
          type="text"
          className="search-field"
          placeholder="Enter the Name of a Survivor to flag as Infected"
          value={survivorToFlag}
          onChange={(e) => {
            setSurvivorToFlag(e.target.value);
          }}
          ref={refContainer}
          data-testid="searchField"
        />
        <button 
        className="flag-button"
          data-testid="searchButton"
        >
          Flag Survivor As Infected
        </button>
      </form>
      <div className="subtitles">
        <div className="infection-bar-subtitles-container">
          <div className="subtitle-boxes">
            <h1 className="subtitles-title">Subtitles</h1>
            <div className="subtitle-box-container">
              <div className="non-infected-survivors-subtitle subtitle-box"></div>
              <label className="subtitle-description">Non-infected</label>
            </div>
            <div className="subtitle-box-container">
              <div className="infected-survivors-subtitle subtitle-box"></div>
              <label className="subtitle-description">Infected</label>
            </div>
          </div>
        </div>
      </div>
      <div className="reports">
        <div className="infection-bar">
          <div className="percentage-bar">
            <div
              class-name="infected-percentage"
              style={{
                backgroundColor: "red",
                height: "100%",
                width: `${(infectedPercentage * 100).toFixed(2)}%`,
                position: "relative",
              }}
            >
              <h1 className="infected-percentage-number">
                {(infectedPercentage * 100).toFixed(2)}%
              </h1>
            </div>
            <h1 className="non-infected-users-percentage">
              {(nonInfectedPercentage * 100).toFixed(2)}
            </h1>
          </div>
        </div>
        <div className="report-row">
          <div className="items-info-container">
            <div className="items-info">
              <h1 className="items-info-title">
                The average amount of each kind of resource by the survivor
              </h1>
              <div className="items-info-grid">
                <div className="item-info">
                  <div className="item-title-and-image">
                    <img
                      src={ak47}
                      className="item-info-icon item-info-icon-ak47"
                    />
                    <h2>AK47</h2>
                  </div>
                  <h2 className="average-quantity-per-survivor" >
                    :{averageQtdOfAK47PerSurvivor.toFixed(1)}
                  </h2>{" "}
                </div>
                <div className="item-info">
                  <div className="item-title-and-image">
                    <img
                      src={soup}
                      className="item-info-icon item-info-icon-soup"
                    />
                    <h2>Campbell Soup</h2>
                  </div>
                  <h2 className="average-quantity-per-survivor">
                    :{averageQtdOfSoupPerSurvivor.toFixed(1)}
                  </h2>{" "}
                </div>
                <div className="item-info">
                  <div className="item-title-and-image">
                    <img src={firstAid} className="item-info-icon" />
                    <h2>First Aid Pouch</h2>
                  </div>
                  <h2 className="average-quantity-per-survivor">
                    :{averageQtdOfAidPerSurvivor.toFixed(1)}
                  </h2>{" "}
                </div>
                <div className="item-info">
                  <div className="item-title-and-image item-title-and-image-water">
                    <img
                      src={water}
                      className="item-info-icon item-info-icon-water"
                    />
                    <h2>Fiji Water</h2>
                  </div>
                  <h2 className="average-quantity-per-survivor average-quantity-per-survivor-water">
                    :{averageQtdOfWaterPerSurvivor.toFixed(1)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="points-lost-due-infection">
            <h1 style={{ marginTop: "3vh" }}>
              Total Points Lost in Items That Belonged To Infected People:
            </h1>
            <h1 style={{ textAlign: "center", marginTop: "2vh" }}>
              {lostPoints} Points
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
