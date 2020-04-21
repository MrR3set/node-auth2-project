const db = require("../data/dbconfig");

module.exports={
    find,
    add,
    findBy,
}

function find(id=null){
    return id?
        db("Users").select("*").where({"id":id}).first()
        :db("Users").select("*");
}

async function add(data){
    return db("Users").insert(data,"id").then(id=>{
        return(find(id[0]))
    });
}

function findBy(filter) {
    return db("Users").where(filter);
}
