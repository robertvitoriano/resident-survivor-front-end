import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import IconAk47 from "./../../assets/inventory-icons/weapon.png";
import IconSoup from "./../../assets/inventory-icons/Soup.png";
import IconFirstAid from "./../../assets/inventory-icons/red-cross.png";
import IconWater from "./../../assets/inventory-icons/bottledwater.png";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

const Trade = ({ match }) => {

  const history = useHistory()
  const [survivors, setSurvivors] = useState([]);
  const [survivorToTrade, setSurvivorToTrade] = useState("");
  const survivorRef = useRef(null);
  const refInput = useRef(null);

  //Survivor's items
  const [survivorAK47Quantity, setSurvivorAK47Quantity] = useState(0);
  const [survivorSoupQuantity, setSurvivorSoupQuantity] = useState(0);
  const [survivorWaterQuantity, setSurvivorWaterQuantity] = useState(0);
  const [survivorAidQuantity, setSurvivorAidQuantity] = useState(0);
  const [survivorItemsCounter, setSurvivorItemCounter] = useState(0);
  const [survivorItemsToPick, setSurvivorItemsToPick] = useState("");
  const [survivorId, setSurvivorId] = useState("");
  const survivorMaxAK47Quantity = useRef(null);
  const survivorMaxSoupQuantity = useRef(null);
  const survivorMaxWaterQuantity = useRef(null);
  const survivorMaxAidQuantity = useRef(null);

  //User's items
  const [userAK47Quantity, setUserAK47Quantity] = useState(0);
  const [userSoupQuantity, setUserSoupQuantity] = useState(0);
  const [userWaterQuantity, setUserWaterQuantity] = useState(0);
  const [userAidQuantity, setUserAidQuantity] = useState(0);
  const [userItemsCounter, setUserItemCounter] = useState(0);
  const [userItemsToPay, setUserItemsToPay] = useState("");
  const userMaxAK47Quantity = useRef(null);
  const userMaxSoupQuantity = useRef(null);
  const userMaxWaterQuantity = useRef(null);
  const userMaxAidQuantity = useRef(null);

  //Survivors pontuation
  const [userPoints, setUserPoints] = useState(0);
  const [neededPoints, setNeededPoints] = useState(0);

  const [displayTradingWarning, setDisplayTradingWarning] = useState(false);
  const [isTradePossible, setIsTradePossible] = useState(false);
  const [wasSurvivorFound, setWasSurvivorFound] = useState(false);

  //Fetch all Survivors
  useEffect(() => {

    async function loadSurvivors() {

      const response = await api.get("/people.json");
      setSurvivors(response.data);

    }

    loadSurvivors();

  }, []);

  useEffect(() => {
    async function setUserInfo() {

      const response = await api.get(
        "/people/" + match.params.id + "/properties.json"
      );
      response.data.map((resource) => {
        
        if (resource.item.name === "Campbell Soup") {
          userMaxSoupQuantity.current = resource.quantity;
        }
        if (resource.item.name === "First Aid Pouch") {
          userMaxAidQuantity.current = resource.quantity;
        }
        if (resource.item.name === "Fiji Water") {
          userMaxWaterQuantity.current = resource.quantity;
        }
        if (resource.item.name === "AK47") {
          userMaxAK47Quantity.current = resource.quantity;
        }
      });
    }
    setUserInfo();
  }, [match.params.id]);

  useEffect(() => {
    function handleTradePossibility() {
      if (userPoints === neededPoints && userPoints !== 0) {
        setIsTradePossible(true);
        setDisplayTradingWarning(true);
      }
    }
    handleTradePossibility();
  }, [userPoints, neededPoints]);

  useEffect(() => {
    function setUserItemsInformationToPay() {
      let userItems = "";
      if (userAK47Quantity > 0) {
        userItems += "AK47:" + userAK47Quantity + ";";
      }
      if (userSoupQuantity > 0) {
        userItems += "Campbell Soup:" + userSoupQuantity + ";";
      }
      if (userWaterQuantity > 0) {
        userItems += "Fiji Water:" + userWaterQuantity + ";";
      }
      if (userAidQuantity > 0) {
        userItems += "First Aid Pouch:" + userAidQuantity + ";";
      }
      if (userItemsCounter > 1) {
        userItems = userItems.substring(0, userItems.length - 1);
      }
      setUserItemsToPay(userItems)
    }
    setUserItemsInformationToPay();
  }, [userAK47Quantity, userAidQuantity, userItemsCounter, userItemsToPay, userSoupQuantity, userWaterQuantity])


  useEffect(() => {
    function setSurvivorItemsInformationToPick() {
      let survivorItems = "";
      if (survivorAK47Quantity > 0) {
        survivorItems += "AK47:" + survivorAK47Quantity + ";";
      }
      if (survivorSoupQuantity > 0) {
        survivorItems += "Campbell Soup:" + survivorSoupQuantity + ";";
      }
      if (survivorWaterQuantity > 0) {
        survivorItems += "Fiji Water:" + survivorWaterQuantity + ";";
      }
      if (survivorAidQuantity > 0) {
        survivorItems += "First Aid Pouch:" + survivorAidQuantity + ";";
      }
      if (survivorItemsCounter > 1) {
        survivorItems = survivorItems.substring(0, survivorItems.length - 1);
      }
      setSurvivorItemsToPick(survivorItems);
    }
    setSurvivorItemsInformationToPick()
  }, [survivorAK47Quantity, survivorAidQuantity, survivorItemsCounter, survivorItemsToPick, survivorSoupQuantity, survivorWaterQuantity])


  async function handleSurvivorSearch(e) {
    e.preventDefault();
    const queriedSurvivor = survivors.filter(
      (survivor) => survivor.name === survivorToTrade
    );
    survivorRef.current = survivorToTrade;
    try {
      if (survivorToTrade === "") {
        alert("You need to type a name of a survivor");
      } else {
        const splitLocationString = queriedSurvivor[0].location.split(
          "people/"
        );
        const id = splitLocationString[1];
        setSurvivorId(id);
        const response = await api.get(
          "/people/" + id + "/properties.json"
        );
        if(response.status ===200){
          setWasSurvivorFound(true);
        }
        

        response.data.map((resource) => {
          setWasSurvivorFound(true);
          if (resource.item.name === "Campbell Soup") {
            survivorMaxSoupQuantity.current = resource.quantity;
          }
          if (resource.item.name === "First Aid Pouch") {
            survivorMaxAidQuantity.current = resource.quantity;
          }
          if (resource.item.name === "Fiji Water") {
            survivorMaxWaterQuantity.current = resource.quantity;
          }
          if (resource.item.name === "AK47") {
            survivorMaxAK47Quantity.current = resource.quantity;
          }
        });
        alert("Survivor Found! Trade the Items You Wish!");
        setSurvivorToTrade("");
        refInput.current.focus();
      }
    } catch (e) {
      console.log(e);
      alert("Survivor not Found!");
      setSurvivorToTrade("");
      refInput.current.focus();
    }
  }

  function handleSurvivorAK47Incrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorAK47Quantity <= survivorMaxAK47Quantity.current) {
      if (survivorAK47Quantity === survivorMaxAK47Quantity.current) {
        setSurvivorAK47Quantity(survivorMaxAK47Quantity.current);
      } else if (survivorMaxAK47Quantity.current > 0) {
        setSurvivorAK47Quantity(survivorAK47Quantity + 1);
        setNeededPoints(neededPoints + 8);
        setSurvivorItemCounter(survivorItemsCounter + 1);
      }
    }
  }


  function handleSurvivorAK47Decrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorAK47Quantity > 0) {
      setSurvivorAK47Quantity(survivorAK47Quantity - 1);
      setNeededPoints(neededPoints - 8);
      setSurvivorItemCounter(survivorItemsCounter - 1);

    } else {
      setSurvivorAK47Quantity(0);
    }
  }

  function handleSurvivorSoupIncrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorSoupQuantity <= survivorMaxSoupQuantity.current) {
      if (survivorSoupQuantity === survivorMaxSoupQuantity.current) {
        setSurvivorSoupQuantity(survivorMaxSoupQuantity.current);
      } else if (survivorMaxSoupQuantity.current > 0) {
        setSurvivorSoupQuantity(survivorSoupQuantity + 1);
        setNeededPoints(neededPoints + 12);
        setSurvivorItemCounter(survivorItemsCounter + 1);
      }
    }
  }
  function handleSurvivorSoupDecrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else {
      if (survivorSoupQuantity > 0) {
        setSurvivorSoupQuantity(survivorSoupQuantity - 1);
        setNeededPoints(neededPoints - 12);
        setSurvivorItemCounter(survivorItemsCounter - 1);

      } else {
        setSurvivorSoupQuantity(0);
      }
    }
  }


  function handleSurvivorAidIncrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorAidQuantity <= survivorMaxAidQuantity.current) {
      if (survivorAidQuantity === survivorMaxAidQuantity.current) {
        setSurvivorAidQuantity(survivorMaxAidQuantity.current);
      } else if (survivorMaxAidQuantity.current > 0) {
        setSurvivorAidQuantity(survivorAidQuantity + 1);
        setNeededPoints(neededPoints + 10);
        setSurvivorItemCounter(survivorItemsCounter + 1);
      }
    }
  }

  function handleSurvivorAidDecrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorAidQuantity > 0) {
      setSurvivorAidQuantity(survivorAidQuantity - 1);
      setNeededPoints(neededPoints - 10);
      setSurvivorItemCounter(survivorItemsCounter - 1);
    } else {
      setSurvivorAidQuantity(0);
    }
  }
  function handleSurvivorWaterIncrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorWaterQuantity <= survivorMaxWaterQuantity.current) {
      if (survivorWaterQuantity === survivorMaxWaterQuantity.current) {
        setSurvivorWaterQuantity(survivorMaxWaterQuantity.current);
      } else if (survivorMaxWaterQuantity.current > 0) {
        setSurvivorWaterQuantity(survivorWaterQuantity + 1);
        setNeededPoints(neededPoints + 14);
        setSurvivorItemCounter(survivorItemsCounter + 1);
      }
    }
  }

  function handleSurvivorWaterDecrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (survivorWaterQuantity > 0) {
      setSurvivorWaterQuantity(survivorWaterQuantity - 1);
      setNeededPoints(neededPoints - 14);
      setSurvivorItemCounter(survivorItemsCounter - 1);
    } else {
      setSurvivorWaterQuantity(0);
    }
  }

  function handleUserAK47Incrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userAK47Quantity <= userMaxAK47Quantity.current) {
      if (userAK47Quantity === userMaxAK47Quantity.current) {
        setUserAK47Quantity(userMaxAK47Quantity.current);
      } else if (userMaxAK47Quantity.current > 0) {
        setUserAK47Quantity(userAK47Quantity + 1);
        setUserPoints(userPoints + 8);
        setUserItemCounter(userItemsCounter + 1);
      }
    }
  }


  function handleUserAK47Decrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userAK47Quantity > 0) {
      setUserAK47Quantity(userAK47Quantity - 1);
      setUserPoints(userPoints - 8);
      setUserItemCounter(userItemsCounter - 1);

    } else {
      setUserAK47Quantity(0);
    }
  }

  function handleUserSoupIncrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userSoupQuantity <= userMaxSoupQuantity.current) {
      if (userSoupQuantity === userMaxSoupQuantity.current) {
        setUserSoupQuantity(userMaxSoupQuantity.current);
      } else if (userMaxSoupQuantity.current > 0) {
        setUserSoupQuantity(userSoupQuantity + 1);
        setUserPoints(userPoints + 12);
        setUserItemCounter(userItemsCounter + 1);
      }
    }
  }
  function handleUserSoupDecrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userSoupQuantity > 0) {
      setUserSoupQuantity(userSoupQuantity - 1);
      setUserPoints(userPoints - 12);
      setUserItemCounter(userItemsCounter - 1);
    } else {
      setUserSoupQuantity(0);
    }
  }

  function handleUserAidIncrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userAidQuantity <= userMaxAidQuantity.current) {
      if (userAidQuantity === userMaxAidQuantity.current) {
        setUserAidQuantity(userMaxAidQuantity.current);
      } else if (userMaxAidQuantity.current > 0) {
        setUserAidQuantity(userAidQuantity + 1);
        setUserPoints(userPoints + 10);
        setUserItemCounter(userItemsCounter + 1);
      }
    }
  }

  function handleUserAidDecrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userAidQuantity > 0) {
      setUserAidQuantity(userAidQuantity - 1);
      setUserPoints(userPoints - 10);
      setUserItemCounter(userItemsCounter - 1);
    } else {
      setUserAidQuantity(0);
    }
  }
  function handleUserWaterIncrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userWaterQuantity <= userMaxWaterQuantity.current) {
      if (userWaterQuantity === userMaxWaterQuantity.current) {
        setUserWaterQuantity(userMaxWaterQuantity.current);
      } else if (userMaxWaterQuantity.current > 0) {
        setUserWaterQuantity(userWaterQuantity + 1);
        setUserPoints(userPoints + 14);
        setUserItemCounter(userItemsCounter + 1);
      }
    }
  }

  function handleUserWaterDecrementation(e) {
    e.preventDefault();
    if (!wasSurvivorFound) {
      alert("You Should Search for a survivor first");
      refInput.current.focus();
    } else if (userWaterQuantity > 0) {
      setUserWaterQuantity(userWaterQuantity - 1);
      setUserPoints(userPoints - 14);
      setUserItemCounter(userItemsCounter - 1);
    } else {
      setUserAidQuantity(0);
    }
  }

  function handleTradeWarningButton(e) {
    e.preventDefault();
    setDisplayTradingWarning(false);
  }

  console.log("survivor items to pick: " + survivorItemsToPick)
  console.log("User items to pay: " + userItemsToPay);
  console.log("Survivor to Trade: " + survivorRef.current)

  async function handleTrade(e) {

    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const data = new FormData();
    data.append("consumer[name]", survivorRef.current);
    data.append("consumer[pick]", survivorItemsToPick);
    data.append("consumer[payment]", userItemsToPay);
    try {
      await api.post("/people/" + survivorId + "/properties/trade_item.json", data, config);
      alert('You traded successfully! You received: ' + survivorItemsToPick)

    } catch (e) {
      console.log(e);
      alert('An Error Ocurred');
      history.push("/" + match.params.id + "/trade")
    }
  }

  return (
    <div className="trading-container">
      <form className="search-form" onSubmit={handleSurvivorSearch}>
        <input
          type="text"
          className="search-field search-trader-input"
          placeholder="Enter the Name of a Survivor to Trade items with"
          value={survivorToTrade}
          onChange={(e) => {
            setSurvivorToTrade(e.target.value);
          }}
          ref={refInput}
          data-testid="searchField"     
         />
        <button
          style={{ fontWeight: "bold", fontSize: "20pt" }}
          className="search-trader-button"
          data-testid="searchButton"
        >
          <h3>Search Survivor</h3>
        </button>
      </form>
      <div className="trading-area">
        <div className="survivors-trading-inventories">
          <div className="user-items-container inventory-trading-container">
            <div className="inventory trading-inventory">
              <div className="inventory-item water">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon ak47-icon"
                    alt="ak-47"
                    src={IconAk47}
                  />
                  <h1 className="inventory-item-title">AK47</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserAK47Decrementation(e);
                    }}
                    href="#"
                  >
                    -
                  </a>
                </div>
                <div className="ak47-quantity quantity">
                  <h1 className="item-quantity">{userAK47Quantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserAK47Incrementation(e);
                    }}
                    href="#"
                    data-testid="increaseUserAK47Quantity"
                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:08</div>
              </div>
              <div className="inventory-item soup">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon soup-icon"
                    alt="soup"
                    src={IconSoup}
                  />
                  <h1 className="inventory-item-title">Campbell Soup</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserSoupDecrementation(e);
                    }}
                    href="#"
                  >
                    -
                  </a>
                </div>
                <div className=" soup-quantity quantity">
                  <h1 className="item-quantity">{userSoupQuantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserSoupIncrementation(e);
                    }}
                    href="#"
                    data-testid="increaseUserSoupQuantity"

                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:12</div>
              </div>
              <div className="inventory-item first-aid">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon first-aid-icon"
                    alt="first-aid"
                    src={IconFirstAid}
                  />
                  <h1 className="inventory-item-title">First Aid Pouch</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserAidDecrementation(e);
                    }}
                    href="#"
                  >
                    -
                  </a>
                </div>
                <div className=" aid-quantity quantity">
                  <h1 className="item-quantity">{userAidQuantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserAidIncrementation(e);
                    }}
                    href="#"
                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:10</div>
              </div>
              <div className="inventory-item water">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon water-icon"
                    alt="water"
                    src={IconWater}
                  />
                  <h1 className="inventory-item-title">Fiji Water</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserWaterDecrementation(e);
                    }}
                    href="#"
                  >
                    -
                  </a>
                </div>
                <div className="water-quantity quantity">
                  <h1 className="item-quantity">{userWaterQuantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleUserWaterIncrementation(e);
                    }}
                    href="#"
                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:14</div>
              </div>
            </div>
          </div>
          <div className="survivors-pontuation-container">
            <div className="survivor-pontuation-container">
              <h1>Your Pontuation</h1>
              <h1>{userPoints}</h1>
            </div>
            <div className="survivor-pontuation-container">
              <h1>Needed Pontuation</h1>
              <h1>{neededPoints}</h1>
            </div>
          </div>
          <div className="survivor-items-container inventory-trading-container">
            {wasSurvivorFound ? (
              <div className="survivor-name-display">
                <h1>Survivor Name: {survivorRef.current}</h1>
              </div>
            ) : (
                ""
              )}

            <div className="inventory trading-inventory">
              <div className="inventory-item water">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon ak47-icon"
                    alt="ak-47"
                    src={IconAk47}
                  />
                  <h1 className="inventory-item-title">AK47</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorAK47Decrementation(e);
                    }}
                  >
                    -
                  </a>
                </div>
                <div className="ak47-quantity quantity">
                  <h1 className="item-quantity">{survivorAK47Quantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorAK47Incrementation(e);
                    }}
                    data-testid="increaseSurvivorSoupQuantity"
                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:08</div>
              </div>
              <div className="inventory-item soup">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon soup-icon"
                    alt="soup"
                    src={IconSoup}
                  />
                  <h1 className="inventory-item-title">Campbell Soup</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorSoupDecrementation(e);
                    }}
                  >
                    -
                  </a>
                </div>
                <div className=" soup-quantity quantity">
                  <h1 className="item-quantity">{survivorSoupQuantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorSoupIncrementation(e);
                    }}
                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:12</div>
              </div>
              <div className="inventory-item first-aid">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon first-aid-icon"
                    alt="first-aid"
                    src={IconFirstAid}
                  />
                  <h1 className="inventory-item-title">First Aid Pouch</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorAidDecrementation(e);
                    }}
                  >
                    -
                  </a>
                </div>
                <div className=" aid-quantity quantity">
                  <h1 className="item-quantity">{survivorAidQuantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorAidIncrementation(e);
                    }}
                    data-testid="increaseSurvivorAidQuantity"

                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:10</div>
              </div>
              <div className="inventory-item water">
                <div className="inventory-item-box">
                  <img
                    className="inventory-icon water-icon"
                    alt="water"
                    src={IconWater}
                  />
                  <h1 className="inventory-item-title">Fiji Water</h1>
                </div>
                <div className="minus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorWaterDecrementation(e);
                    }}
                  >
                    -
                  </a>
                </div>
                <div className="water-quantity quantity">
                  <h1 className="item-quantity">{survivorWaterQuantity}</h1>
                </div>
                <div className="plus-sign sign">
                  <a
                    className="sign-icon"
                    onClick={(e) => {
                      handleSurvivorWaterIncrementation(e);
                    }}
                  >
                    +
                  </a>
                </div>
                <div className="points-container">POINTS:14</div>
              </div>
            </div>
          </div>
        </div>
        <a className="register-button trade-button"
          onClick={e => { handleTrade(e) }}
          data-testid="tradeButton"
        >

          Trade</a>
      </div>
      {displayTradingWarning ? (
        <div className="trade-warning-container">
          <div className="trade-warning-message-container">
            <h1 style={{ fontSize: "70pt" }}>Warning!</h1>

            <div className="warning-message">
              <h1 style={{ fontSize: "50pt" }}>Now you Can trade!</h1>
            </div>
            <button
              className="register-button"
              onClick={(e) => {
                handleTradeWarningButton(e);
              }}
            >
              OK
            </button>
          </div>
        </div>
      ) : (
          ""
        )}
    </div>
  );
};
//
export default Trade;
