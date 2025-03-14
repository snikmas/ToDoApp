import {MongoClient} from "mongodb"
import express from "express"

const PORT = process.env.PORT
const DB_STRING = process.env.DB_STRING
const dirname = import.meta.dirname
const app = express();

app.use(express.urlencoded({ extended: true}))
app.set('view engine', 'main.ejs');
app.use(exress.static('public'))


async function connectToDb(){
  try {
    const client = await MongoClient.connect(DB_STRING)
    console.log("Connected to the db")

    const db = client.db('toDoApp');
    const tasks = db.collection('tasks');

    return tasks;
  } catch(err) {
    console.error(err)
  }
}

function createServer(tasks) {

  app.get('/', async(req, res) => {
    try {
      const tasksInfo = await tasks.find().toArray();
      tasksInfo.forEach((task) => console.log(task._id))
      res.render("main.ejs", {tasks: tasksInfo})

    } catch (err){
      console.error(err)
    }

    console.log('sent a file');
  })
  
  app.post('/addTask', async(req, res) => {
    
    try {
      const result = await tasks.insertOne({
        task: req.body.task,
        completed: false
      })

      console.log(result);

    } catch(err){
      console.error(err)
    }

    res.redirect('/');
  })


  app.delete('/deleteTask', async(req, res) => {
    console.log('oops')
    try {
      const result = await book.deleteOne({ _id: req.body._id})

      res.json("Deleted")

    } catch(err){
      console.error('Failed: ' + err)
    }
  })
  
  
  
  app.listen(PORT || 3000, () => {
    console.log('listeting...')
  })
  
}
  
async function main() {
  try{
    const tasks = await connectToDb();
    createServer(tasks);
  } catch(err) {
    console.log(err)
  }
  
}
  

main();