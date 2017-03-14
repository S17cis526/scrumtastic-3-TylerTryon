"use strict";

module.export = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
}

function list(req, res, db){
  db.all("SELECT * FROM projects", [], function(err, projects){
    if (err){
      res.statusCode = 500;
      res.end("Server Error");
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(project));
  });
}

function create(req, res, db){
  var body = ""

  req.on("error", function(err){
    console.error(err);
    res.statusCode = 500;
    res.end("Server error");
  });

  req.on("data", function(data){
    body += data;
  });

  req.on("end", function(){
    var project = JSON.parse(body);
    db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?,?,?,?,?)");

    function(err){
      if(err){
        console.error(err);
        res.statusCode = 500;
        res.end("Could not insert project into database");
        return;
      }
      res.statusCode = 200;
      res.end();
    }
  });
}

function read(req, res, db){
  var id = req.params.id;
  db.get("SELECT * FROM projects WHERE id=?", [id], function(err, project){
    if(err){
        res.statusCode = 500;
        res.end("Server error");
        return;
    }
    if(!project){
      res.statusCode = 404;
      res.end("Project not found");
      return;
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(project));
  });
}


function update(req, res, db) {
  var id = req.params.id;
  var body = ""

  req.on("error", function(err){
    console.error(err);
    res.statusCode = 500;
    res.end("Server error");
  });

  req.on("data", function(data){
    body += data;
  });

  req.on("end", function(){
    var project = JSON.parse(body);
    db.run("UPDATE projects (nam=?e, description=?, version=?, repository=?, license=?) WHERE id=?");

    function(err){
      if(err){
        console.error(err);
        res.statusCode = 500;
        res.end("Could not insert project into database");
        return;
      }
      res.statusCode = 200;
      res.end();
    }
  });
}

function destroy(req, res, db){
  var id = req.params.id;
  db.run("DELETE FROM projects WHERE id=?", [id], function(err){
    if (err){
      console.error(err);
      res.statusCode = 500;
      res.end("Server err");
      return;
    }
    res.statusCode = 200;
    res.end();
  })
}
