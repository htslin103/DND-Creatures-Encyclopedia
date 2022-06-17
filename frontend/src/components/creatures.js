import React, { useState, useEffect} from "react";
import CreatureDataService from "../services/creature";

const Creature = props => {
  var initialCreatureState = {
    id: null,
    name : "",
    meta :"",
    "Armor Class" :"",
    "Hit Points" :"",
    Speed :"",
    STR :"",
    STR_mod :"",
    DEX :"",
    DEX_mod :"",
    CON :"",
    CON_mod :"",
    INT :"",
    INT_mod :"",
    WIS :"",
    WIS_mod :"",
    CHA :"",
    CHA_mod :"",
    "Saving Throws" :"",
    Skills :"",
    "Damage Immunities" :"",
    Senses :"",
    Languages :"",
    Challenge :"",
    Traits :"",
    Actions :"",
    "Legendary Actions" :"",
    img_url :"",    
  };

const [creature, setCreature] = useState(initialCreatureState);

  const getCreature = id => {
    CreatureDataService.get(id)
      .then(response => {
        setCreature(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        console.log("Something wrong in the getCreature fxn in creatures.js");
        
      });
  };
  /*Called when the page first renders*/
  useEffect(() => {
    getCreature(props.match.params.id);
  }, [props.match.params.id]);

/*   const deleteCreature = (id, index) => {
    CreatureDataService.deleteCreature(id)
      .then(response => {
        setCreature((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  }; */

  return (
    <div>
      {creature ? (
        <div>    
          <img src= {""+creature.img_url} width="300" height="300"/>
          <h5>{creature.name}</h5>
          <p>
            
            <strong>Meta: </strong>{creature.meta}<br/>          
            <strong>Armor Class: </strong>{creature["Armor Class"]}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
            <strong>Meta: </strong>{creature.meta}<br/>
          </p>
        </div>
      ) : (
        <div>
          <br />
          <p>No creature selected.</p>
        </div>
      )}
        </div>
  );
};

export default Creature;
