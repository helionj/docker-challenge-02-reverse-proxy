const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}


app.use(express.json())

app.get('/', (req,res) => {
  insert()
  const sqlQuery = 'SELECT * from people'
  execSQLQuery(sqlQuery, res)
  
})

app.listen(port, () => {
  console.log('Server running')
})

const execSQLQuery = (sqlQry, res) => {
  const connection = mysql.createConnection(config);

  connection.query(sqlQry, (error, results, fields) => {
      if(error) 
        res.json(error);
      else
        res.send(`<h1>Full Cycle Rocks</h1>${results.map(result => JSON.stringify(result))}`);
      connection.end();
      
  })
}
const insert = () => {
  const connection = mysql.createConnection(config)
  const sql = `INSERT into people(name) values('Tobias')`
  connection.query(sql)
  connection.end()
}



