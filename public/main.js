const deleteBtns = document.getElementsByClassName("delete")


deleteBtns.forEach(btn, () => {
  btn.addEventListener('click', sendDeleteReq);
})

function sendDeleteReq(){
  
}