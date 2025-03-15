const deleteBtns = document.getElementsByClassName("delete")


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