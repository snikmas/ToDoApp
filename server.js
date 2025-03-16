import {MongoClient} from "mongodb"
import express from "express"
import bodyParser from 'body-parser'

const PORT = process.env.PORT
const DB_STRING = process.env.DB_STRING
const dirname = import.meta.dirname
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.set('view engine', 'main.ejs');
app.use(express.static('public'))


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
    try {
      const result = await tasks.deleteOne({ task: req.body.task})
      res.json("Deleted")

    } catch(err){
      console.error('Failed: ' + err)
    }
  })
  
  async function taskStatus(req, res, status, tasks){
    try {
      const result = await tasks.updateOne({
        task: req.body.task
      }, {
        $set: {
          completed: status,
        }
      });

      res.json(`Marked ${status ? 'Completed' : 'Uncompleted'}`)} catch (err) {
        console.error('Failed to complete the task')
      }
    }
  }


  app.put('/taskUncompleted', async(req, res) => {
    await taskStatus(req, res, false, tasks);
  })

  app.put('/taskCompleted', async(req, res) => {
    await taskStatus(req, res, true, tasks);
  })
  
  
  app.listen(PORT || 3000, () => {
    console.log('listeting...')
  })
  

  
async function main() {
  try{
    const tasks = await connectToDb();
    createServer(tasks);
  } catch(err) {
    console.log(err)
  }
  
}
  

main();