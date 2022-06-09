import http from "../http-common";

class CreatureDataService {

/*Gets all creatures, 
you can choose a page, these gets are just based off of the baseURL from http-common */ 
  getAll(page = 0) {
    return http.get(`creatures?page=${page}`);
  }
  //Get creature based on creatureId
  get(id) {
    return http.get(`/creature?id=${id}`);
  }
  //Query-actual search term or number, searching by name/zipcode/cuisine, and then page number 
  find(query, by = "name", page = 0) {
      //is this right? or should we remove creature in the get 
    return http.get(`creature?${by}=${query}&page=${page}`);
  } 
  //Post 
  createCreature(data) {
    return http.post("/creature_new", data);
  }
  //Put
  updateReview(data) {
    return http.put("/creature_edit", data);
  }
  //Delete
  deleteReview(id, userId) {
    return http.delete(`/creature_delete?id=${id}`);
  }
  //Get meta based on id 
  getMetas(id) {
    return http.get(`/metas`);
  }
}
  
export default new CreatureDataService();