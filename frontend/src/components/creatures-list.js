import React, {useState,useEffect} from "react";
import CreatureDataService from "../services/creature";
import { Link } from "react-router-dom";


const CreaturesList = props => {
  const [creatures, setCreatures] = useState([]); 
  const [searchName, setSearchName] = useState("");
  const [searchMeta, setSearchMeta] = useState("");
  const [metas, setMetas] = useState(["All Metas"]);

  useEffect(() => {
    retrieveCreatures();
    retrieveMetas();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchMeta = e => {
    const searchMeta = e.target.value;
    setSearchMeta(searchMeta);
    
  };

  const retrieveCreatures = () => {
    CreatureDataService.getAll()
      .then(response => {
        console.log(response.data);
        setCreatures(response.data.creatures);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveMetas = () => {
    CreatureDataService.getMetas()
      .then(response => {
        console.log(response.data);
        // First start with all metas and then concat so it becomes a drop down 
        setMetas(["All Metas"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  //retrieves all the creatures
  const refreshList = () => {
    retrieveCreatures();
  };

  //Called by functions below(Name, Meta)
  const find = (query, by) => {
    CreatureDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setCreatures(response.data.creatures);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Users can search for name or meta, we take the value and set to whatever the person typed in 
  const findByName = () => {
    find(searchName, "name")
  };

  const findByMeta = () => {
    if (searchMeta === "All Metas") {
      refreshList();
    } else {
      find(searchMeta, "meta")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchMeta}>
             {metas.map(meta => {
               return (
                 <option value={meta}> {meta.substring(0, 50)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByMeta}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {creatures.map((creature) => {
          return (
            <div className="col-lg-4 pb-1">
                   
              <div className="card">
                <div className="card-body">                 
                  <h5 className="card-title">{creature.name}</h5>
                  <p className="card-text">
                    <strong>Meta: </strong>{creature.meta}<br/>
                    <img src= {""+creature.img_url} width="300" height="300"/>
                  </p>
                  <div className="row">                   
                  <Link to={"/creatures/"+creature._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                  View Details
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreaturesList;
