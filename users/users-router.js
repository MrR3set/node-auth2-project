const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("./users-model.js");

router.get("/", (req, res) => {

  const client = jwt.decode(req.headers.authorization);

  Users.findBy({"department":client.department}).then(users => {
      users.length>0
        ?res.status(200).json(users)
        :res.status(404).json({msg:"no users found"})
    })
    .catch(err =>{ 
      console.log(err);
      res.status(500).send(err)
    });
});

router.get("/:id", (req, res) => {
  Users.find(req.params.id).then(user => {
    user
      ?res.status(200).json(user)
      :res.status(404).json({msg:"no users where found with the specified id"})
  })
  .catch(err =>{ 
    console.log(err);
    res.status(500).send(err)
  });
});

module.exports = router;
