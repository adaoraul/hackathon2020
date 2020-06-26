import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header";
import SVGSpriteSheet from "../SVGSpriteSheet";
import LocationSVG from "../LocationSVG";
import DateSVG from "../DateSVG";
import Button from "../Button";
import IdeaCard from "../IdeaCard";
import IdeaInfoOverlay from "../IdeaInfoOverlay";
import JoinIdeaOverlay from "../JoinIdeaOverlay";

import registrationImg from "../../assets/registration.PNG";
import inspirationImg from "../../assets/inspiration.PNG";
import rulesImg from "../../assets/rules.PNG";
import ideasImg from "../../assets/ideas.PNG";
import hackImg from "../../assets/hack.PNG";

const App = ({}) => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/ideas")
      .then((response) => response.json())
      .then((data) => setIdeas(data));
  }, []);

  return (
    <div className="App">
      <section className="App-Main-Section">
        <Header />
        <div className="App-Main-Section-Container">
          <div className="App-Main-Section-Column">
            <div className="App-Main-Section-Info">
              <div className="App-Main-Section-Title">
                Cool name for our cool hackathon
              </div>
              <div className="App-Main-Section-Date">
                <DateSVG />
                <p> 12-15 December 2020 </p>
              </div>
              <div className="App-Main-Section-Location">
                <LocationSVG />
                <p> Online </p>
              </div>
              <Button
                title="Go to registration"
                action="scroll"
                target="Registration"
              />
            </div>
          </div>
          <div className="App-Main-Section-Column">
            <img src={hackImg}></img>
          </div>
        </div>
      </section>
      <hr />
      <section className="Registration"></section>
      <hr />
      <section className="App-Ideas-Section">
        <div className="App-Ideas-Section-Container">
          <div className="App-Section-Title">Ideas</div>
          {ideas.map((idea) => {
            return (
              <IdeaCard
                id={idea._id}
                name={idea.name}
                description={idea.description}
                team={idea.team}
              />
            );
          })}
        </div>
      </section>
      <hr />
      <SVGSpriteSheet />
      <IdeaInfoOverlay />
      <JoinIdeaOverlay />
    </div>
  );
};

export default App;
