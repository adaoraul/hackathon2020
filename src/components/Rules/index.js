import React from 'react';
import './Rules.css';

const Rules = () => (
  <div className="Rules" id="rules">
    <div className="Rules-Container">
      <h1 className="Rules-Title">Rules</h1>
      <ul className="Rules-List">
        <li className="Rules-Item">
          <h2>
            FRESH CODE BUT BE PREPARED
          </h2>
          <p>No matter the project, you should start coding together and not start hacking beforehand. What you can do however, is sit down with your respective team at least a few days before the hackathon and discuss what you need for your initial setup, what you intend to do exactly, how the tasks will be divided between the team members and what you will need in terms of hard-/software.</p>
        </li>
        <li className="Rules-Item">
          <h2>
            TEAM SETUP
          </h2>
          <p>
            Teams should consist of 2-3 members. You can pick your project and team partners as you like, but be mindful to mix with people you normally don't work with. That's the most important rule. Also think about working on a topic you normally don't work on, this is what the hackathon is for!
          </p>
        </li>
        <li className="Rules-Item">
          <h2>
            DEMO YOUR WORK
          </h2>
          <p>
            At the end of the Hackathon, every team will have 3-5min to make a DEMO, and 3-5min for Q&A from the crowd.
          </p>
        </li>
        <li className="Rules-Item">
          <h2>WINNING
          </h2>
          <p>
            After all demos, everyone will vote for their 3 favourite teams and rank them. The link to the voting will be shared on the day of the event.
          </p>
        </li>
      </ul>
    </div>
  </div>
);

export default Rules;
