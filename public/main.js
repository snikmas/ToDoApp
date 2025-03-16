const deleteBtns = document.getElementsByClassName("delete")
const uncompletedTasks = document.getElementsByClassName("uncompleted");
const completedTasks = document.getElementsByName("completed");

Array.from(uncompletedTasks).forEach((task) => {
  task.addEventListener('click', markComplete)
})

Array.from(completedTasks).forEach((task) => {
  task.addEventListener('click', markUncomplete)
})

async function mark(endpoint, task){
  try {
    const result = await fetch(endpoint, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      //send task to the req body
      body: JSON.stringify({
        task: task
      })
    });
    const data = await result.json();
    location.reload();
  } catch(err){
    console.error(`Error marking task: ${err}`)
  }
}

Array.from(deleteBtns).forEach((btn) => {
  btn.addEventListener('click', sendDeleteReq);
})

async function sendDeleteReq(){
  try {
    let taskLi = this.parentNode.textContent;
    taskLi = taskLi.replace('Delete', '').trim();


    const result = await fetch(`/deleteTask`, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        task: taskLi
      })
    })

    const data = await result.json();
    console.log(data);

    location.reload()
  } catch(err) {
    console.log('Error deleting a task ' + err);
  }
}

