import CreaturesDAO from "../dao/creaturesDAO.js"

export default class CreaturesController {


  static async apiGetCreatures(req, res, next) {
    const creaturesPerPage = req.query.creaturesPerPage ? parseInt(req.query.creaturesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0
    
    let filters = {} 
    if (req.query.name) {
      filters.name = req.query.name
    } 
    else if (req.query.meta) {
      filters.meta = req.query.meta
    } 
    else if (req.query.hitpoints) {
      filters.hitpoints = req.query.hitpoints
    }
    else if (req.query.str) {
      filters.str = req.query.str
    }
    else if (req.query.senses) {
      filters.senses = req.query.senses
    }
    else if (req.query.damageimmunities) {
      filters.damageimmunities = req.query.damageimmunities
    }

    const { creaturesList, totalNumCreatures } = await CreaturesDAO.getCreatures({
      filters,
      page,
      creaturesPerPage,
    })

    let response = {
      creatures: creaturesList,
      page: page,
      filters: filters,
      entries_per_page: creaturesPerPage,
      total_results: totalNumCreatures,
    }
    res.json(response)
  }

  static async apiPostCreature(req,res,next){
    try {
      //Mongodb should generate an object Id automatically
      //This is how we get the object from Postman 
      
      //replace this with a class later. For some reason putting this in a function didn't work
  /*     const creatureInfo = {
        name: req.body.name,
        meta: req.body.meta,
        ArmorClass: req.body.ArmorClass,
        HitPoints: req.body.HitPoints,
        Speed: req.body.Speed,
        STR: req.body.STR,
        STR_mod: req.body.STR_mod,
        DEX: req.body.DEX,
        DEX_mod: req.body.DEX_mod,
        CON: req.body.CON,
        CON_mod: req.body.CON_mod,
        INT: req.body.INT,
        INT_mod: req.body.INT_mod,
        WIS: req.body.WIS,
        WIS_mod: req.body.WIS_mod,
        CHA: req.body.CHA,
        CHA_mod: req.body.CHA_mod,
        SavingThrows: req.body.SavingThrows,
        Skills: req.body.Skills,
        DamageImmunities: req.body.DamageImmunities,
        Senses: req.body.Senses,
        Languages: req.body.Languages,
        Challenge: req.body.Challenge,
        Traits: req.body.Traits,
        Actions: req.body.Actions,
        LegendaryActions: req.body.LegendaryActions,
        img_url: req.body.img_url, 
      } */
      
      //from creaturesDAO
      const creatureDoc = {
          name : creatureInfo.name,
          meta : creatureInfo.meta,
          "Armor Class" : creatureInfo.ArmorClass,
          "Hit Points" : creatureInfo.HitPoints,
          Speed : creatureInfo.Speed,
          STR : creatureInfo.STR,
          STR_mod : creatureInfo.STR_mod,
          DEX : creatureInfo.DEX,
          DEX_mod : creatureInfo.DEX_mod,
          CON : creatureInfo.CON,
          CON_mod : creatureInfo.CON_mod,
          INT : creatureInfo.INT,
          INT_mod : creatureInfo.INT_mod,
          WIS : creatureInfo.WIS,
          WIS_mod : creatureInfo.WIS_mod,
          CHA : creatureInfo.CHA,
          CHA_mod : creatureInfo.CHA_mod,
          "Saving Throws": creatureInfo.SavingThrows,
          Skills: creatureInfo.Skills,
          "Damage Immunities" : creatureInfo.DamageImmunities,
          Senses : creatureInfo.Senses,
          Languages : creatureInfo.Languages,
          Challenge : creatureInfo.Challenge,
          Traits : creatureInfo.Traits,
          Actions : creatureInfo.Actions,
          "Legendary Actions" : creatureInfo.LegendaryActions,
          img_url : creatureInfo.img_url,              
        } 
      
      const CreatureResponse = await CreaturesDAO.addCreature(creatureDoc
        //creatureInfo 
      )
      res.json({ status: "successfully added the creature" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateCreature(req, res, next) {
    try {
      const creatureInfo = {
      creatureId: req.body.creatureId,
      name: req.body.name,
      meta: req.body.meta,
      ArmorClass: req.body.ArmorClass,
      HitPoints: req.body.HitPoints,
      Speed: req.body.Speed,
      STR: req.body.STR,
      STR_mod: req.body.STR_mod,
      DEX: req.body.DEX,
      DEX_mod: req.body.DEX_mod,
      CON: req.body.CON,
      CON_mod: req.body.CON_mod,
      INT: req.body.INT,
      INT_mod: req.body.INT_mod,
      WIS: req.body.WIS,
      WIS_mod: req.body.WIS_mod,
      CHA: req.body.CHA,
      CHA_mod: req.body.CHA_mod,
      SavingThrows: req.body.SavingThrows,
      Skills: req.body.Skills,
      DamageImmunities: req.body.DamageImmunities,
      Senses: req.body.Senses,
      Languages: req.body.Languages,
      Challenge: req.body.Challenge,
      Traits: req.body.Traits,
      Actions: req.body.Actions,
      LegendaryActions: req.body.LegendaryActions,
      img_url: req.body.img_url, 
      }
      const creatureResponse = await CreaturesDAO.updateCreature(creatureInfo     
      )

      var { error } = creatureResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (creatureResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update creature, nothing was modified",
        )
      }

      res.json({ status: "successfully updated the creature" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteCreature(req, res, next){
    try {
      const creatureId = req.query.id
      //normally you would need better authentication
      const creatureResponse = await CreaturesDAO.deleteCreature(
        creatureId
      )
      res.json({ status: "Request successfully sent" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

    
  static async apiGetCreatureById(req, res, next) {
    try {
      let id = req.params.id || {}
      let creature = await CreaturesDAO.getCreatureByID(id)
      if (!creature) {
        res.status(404).json({ error: "No creatures were found" })
        return
      }
      res.json(creature)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  
  static async apiGetCreatureMetas(req, res, next) {
    try {
      let metas = await CreaturesDAO.getMetas()
      res.json(metas)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}