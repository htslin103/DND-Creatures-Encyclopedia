import http from "../http-common";

class CreatureDataService {

/*Gets all creatures, 
you can choose a page, these gets are just based off of the baseURL from http-common */ 
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }
  //Get creature based on creatureId
  get(id) {
    return http.get(`id/${id}`);
  }
  //Query-actual search term or number, searching by name/meta/and then page number 
  find(query, by = "name", page = 0) {
    return http.get(`/?${by}=${query}&page=${page}`);
  } 
  //Post 
  createCreature(data) {
    return http.post("/creature_new", data);
  }
  //Put
  updateCreature(data) {
    return http.put("/creature_edit", data);
  }
  //Delete
  deleteCreature(id) {
    return http.delete(`/creature_delete?id=${id}`);
  }
  //Get meta based on id 
  getMetas(id) {
    return http.get(`/metas`);
  }
}
  
export default new CreatureDataService();