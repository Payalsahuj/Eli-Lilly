
let nameinput=document.getElementById("name")
let batch=document.getElementById("batch")
let section=document.getElementById("section")
let eval_score=document.getElementById("eval_score")
let image=document.getElementById("image")
let add_student =document.getElementById("add_student")
let new_score =document.getElementById("new_score")
let sortHigToLow= document.getElementById("sort-high-to-low")
let sortLowToHigh=document.getElementById("sort-low-to-high")
let lessThan =document.getElementById("less-than")
let greaterThan=document.getElementById("greater-than")

let container=document.getElementById("container")



window.addEventListener('load',()=>{
    getdata()
})



function getdata(){
    fetch("http://localhost:3004/masai").then((res)=> res.json())
    .then((res)=> {
        carddata(res)
    })
    .catch((err)=> console.log(err))
}





function carddata(data){
   let carddatamap= data.map((item)=>card(item.id,item.name,item.batch,item.score,item.section)).join("")
   container.innerHTML=carddatamap

   let updatebutton=document.querySelectorAll(".update_score")
   let deletebutton=document.querySelectorAll(".remove_student")
   for(let update of updatebutton){
    
    update.addEventListener("click",(e)=>{
      e.preventDefault()
      updatescorefun(e.target.dataset.id)
    })  
  }

  for(let deletebt of deletebutton){
      deletebt.addEventListener("click",(e)=>{
      e.preventDefault()
      deletedatafun(e.target.dataset.id)
    })  
  }
}





function deletedatafun(id){
    fetch(`http://localhost:3004/masai/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
          
        },
      })
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
      getdata()
      })
}





function updatescorefun(id){
    let obj1={
        score: +new_score.value
      }
    fetch(`http://localhost:3004/masai/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(obj1)
      })
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
      getdata()
      new_score.value=''
      })
          
}



function card(id,name,batch,score,section){
    let card=`
    <div data-id=${id} class="student" >
    <h3>${name}</h3>
    <p class="student_score">${+score}</p>
    <p>Batch: ${batch}</p>
    <p>${section}</p>
    <button data-id=${id}  data-name=${name} class="remove_student">Remove</button>
    <button data-id=${id}  data-name=${name} class="update_score">Update</button>
  </div>
`
return card
}



add_student.addEventListener("click",async ()=>{
    let username=nameinput.value;
    let userbatch=batch.value;
    let usersection=section.value;
    let userscore=+eval_score.value;
    let userimage=image.value;
    let obj={
      name: username,
      batch:userbatch,
      section: usersection,
      score: userscore,
      image: userimage
    }

    console.log(obj)
    try{
        let res=await fetch("http://localhost:3004/masai",{
          method:"POST",
          headers:{
            "Content-type":"application/json",
          },
          body:JSON.stringify(obj)
        });
        let data= await res.json();
        console.log(data)
        getdata()
    }
    catch(error){
        console.log(error)
        }

})



sortLowToHigh.addEventListener('click',()=>{
    fetch("http://localhost:3004/masai?_sort=score&_order=asc").then((res)=> res.json())
    .then((res)=> {
        carddata(res)
    })
    .catch((err)=> console.log(err))
})




sortHigToLow.addEventListener('click',()=>{
    fetch("http://localhost:3004/masai?_sort=score&_order=desc")
    .then((res)=> res.json())
    .then((res)=> {
        carddata(res)
    })
    .catch((err)=> console.log(err))
})




lessThan.addEventListener("click",()=>{
    fetch("http://localhost:3004/masai?score_gte=5")
    .then((res)=> res.json())
    .then((res)=> {
        carddata(res)
    })
    .catch((err)=> console.log(err))
})



greaterThan.addEventListener("click",()=>{
    fetch("http://localhost:3004/masai?score_lte=5")
    .then((res)=> res.json())
    .then((res)=> {
        carddata(res)
    })
    .catch((err)=> console.log(err))
})