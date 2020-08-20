import React, { useState, useEffect, useRef } from "react";
import ak47 from "./../../assets/inventory-icons/weapon.png";
import soup from "./../../assets/inventory-icons/Soup.png";
import firstAid from "./../../assets/inventory-icons/red-cross.png";
import water from "./../../assets/inventory-icons/bottledwater.png";
import "./style.css";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [waterTotal, setWaterTotal] = useState(0);
  const [ak47Total, setAk47Total] = useState(0);
  const [soupTotal, setSoupTotal] = useState(0);
  const [aidTotal, setAidTotal] = useState(0);
  const [wereCredentialsFilled, setWereCredentialsFilled] = useState(false);
  const [chosenItems, setChosenItems] = useState("");
  const [chosenItemsQuantity, setChosenItemsQuantity] = useState("");
  const [itemsCounterState, setItemsCounterState] = useState('');
  const ak47QuantityRef = useRef('')
  const waterQuantityRef = useRef('')
  const soupQuantityRef = useRef('')
  const aidQuantityRef = useRef('')




  useEffect(() => {

    function preventNegative() {
      if (ak47Total <0) {
        setAk47Total(ak47Total + 1);
        console.log('hasClicked');
      }
      if (waterTotal <0) {
        setWaterTotal(waterTotal + 1);
      }
      if (soupTotal <0) {
        setSoupTotal(soupTotal + 1);
      }
      if (aidTotal <0) {
        setAidTotal(aidTotal + 1);
      }
    }
    preventNegative()

  }, [ak47Total, waterTotal, soupTotal, aidTotal])


  useEffect(() => {

    function setItems() {
      if(ak47Total>0)
      ak47QuantityRef.current = "AK47:" + (ak47Total) + ";";
      if(soupTotal>0)
      soupQuantityRef.current = "Campbell Soup:" + (soupTotal) + ";";
      if(waterTotal>0)
      waterQuantityRef.current = "Fiji Water:" + (waterTotal) + ";";
      if(aidTotal>0)
      aidQuantityRef.current = "First Aid Pouch:" + (aidTotal) + ";";
 
      setChosenItems(ak47QuantityRef.current + waterQuantityRef.current + soupQuantityRef.current + aidQuantityRef.current);
      setItemsCounterState(itemsCounterState + 1)
    }
    setItems();
  }, [ak47Total, waterTotal, soupTotal, aidTotal])


  function handleNext(e) {
    e.preventDefault();
    setWereCredentialsFilled(true);
  }

  async function handleFinish(e) {
    e.preventDefault();
    let locationFields = location.split(",");
    let longitude = locationFields[0];
    let latitude = locationFields[1];
    let lonlat = `POINT (${longitude} ${latitude})`;
    if (itemsCounterState > 1) {
      setChosenItems(chosenItems.substring(0, chosenItems.length - 1));
    }
    try {
      const response = await api.post("/people.json", {
        name: name,
        age: age,
        gender: gender,
        lonlat: lonlat,
        items: chosenItems,
      });
      console.log(response)

      if (response.status == 201) {
        history.push('/' + response.data.id)
      }
    } catch (e) {
      alert('An error occured, try againg, please!');
      window.location.reload(false);
    }
  }

  return (
    <div className="register-container">
      <h1 className="register-message">Identify yourself below</h1>
      {!wereCredentialsFilled ?(
        <section className="form">
          <form onSubmit={handleNext}>
            <input
              type="text"
              className="register-input"
              placeholder="Type your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="name"
            />
            <input
              type="text"
              className="register-input"
              placeholder="Type your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              data-testid="age"

            />
            <input
              type="text"
              className="register-input"
              placeholder="Type your Gender (M/F)"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              data-testid="gender"

            />
            <input
              type="text"
              className="register-input"
              placeholder="Last location (latitude,longitude)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              data-testid="location"

            />
            <button
              className="register-button"
              data-testid="nextButton"

            >Next</button>
          </form>
        </section>
      ) : (
          <div className="inventory-container">
            <div className="inventory">
              <div className="inventory-item water">
                <div className="inventory-item-box">
                  <img
                    src={ak47}
                    className="inventory-icon ak47-icon"
                    alt="ak-47"

                  />
                  <h2 className="inventory-item-title">AK47</h2>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setAk47Total(ak47Total - 1);
                 
                    }}
                    data-testid="decreaseAK47QuantityButton"

                  >
                    -
                </a>
                </div>
                <div className="ak47-quantity quantity"><h1>{ak47Total}</h1></div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setAk47Total(ak47Total + 1);
                      

                    }}
                    data-testid="increaseAK47QuantityButton"
                  >
                    +
                </a>
                </div>
                <div className="points-container">POINTS:08</div>
              </div>
              <div className="inventory-item soup">
                <div className="inventory-item-box">
                  <img
                    src={soup}
                    className="inventory-icon soup-icon"
                    alt="soup"
                  />
                  <h2 className="inventory-item-title">Campbell Soup</h2>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setSoupTotal(soupTotal - 1);

                    }}
                    data-testid="decreaseSoupQuantityButton"

                  >
                    -
                </a>
                </div>
                <div className=" soup-quantity quantity"><h1>{soupTotal}</h1></div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setSoupTotal(soupTotal + 1);

                    }}
                    data-testid="increaseSoupQuantityButton"

                  >
                    +
                </a>
                </div>
                <div className="points-container">POINTS:12</div>
              </div>
              <div className="inventory-item first-aid">
                <div className="inventory-item-box">
                  <img
                    src={firstAid}
                    className="inventory-icon first-aid-icon"
                    alt="first-aid"
                  />
                  <h2 className="inventory-item-title">First Aid Pouch</h2>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setAidTotal(aidTotal - 1);


                    }}
                    data-testid="decreaseAidQuantityButton"

                  >
                    -
                </a>
                </div>
                <div className=" aid-quantity quantity"><h1>{aidTotal}</h1></div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setAidTotal(aidTotal + 1);

                    }}
                    data-testid="increaseAidQuantityButton"
                  >
                    +
                </a>
                </div>
                <div className="points-container">POINTS:10</div>
              </div>
              <div className="inventory-item water">
                <div className="inventory-item-box">
                  <img
                    src={water}
                    className="inventory-icon water-icon"
                    alt="water"

                  />

                  <h2 className="inventory-item-title">Fiji Water</h2>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setWaterTotal(waterTotal - 1);

                    }}
                    data-testid="decreaseWaterpQuantityButton"

                  >
                    -
                </a>
                </div>
                <div className="water-quantity quantity item-quantity"><h1>{waterTotal}</h1></div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      setWaterTotal(waterTotal + 1);
                    }}
                    data-testid="increaseWaterpQuantityButton"

                  >
                    +
                </a>
                </div>
                <div className="points-container">POINTS:14</div>
              </div>
            </div>
            <button
              className="register-button"
              onClick={(e) => handleFinish(e)}
              data-testid="finishButton"
            >
              FINISH
          </button>
          </div>
        )}
    </div>
  );
};

export default Register;
