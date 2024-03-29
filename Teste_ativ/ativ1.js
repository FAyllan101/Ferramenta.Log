const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach(todo =>{
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

function dragStart(){
    draggableTodo = this;
    setTimeout(() => {
        this.style.display= "none";
    }, 0);
    console.log("dragStart");
}

function dragEnd(){
    draggableTodo = null;
    setTimeout(() => {
        this.style.display= "block";
    }, 0);
    console.log("dragEnd");
}

all_status.forEach((status)=> {
    status.addEventListener("dragover",dragOver);
    status.addEventListener("dragenter",dragEnter);
    status.addEventListener("dragleave",dragLeave);
    status.addEventListener("drop",dragDrop);
});

function dragOver(e){
    e.preventDefault();
    // console.log("dragOver");
}

function dragEnter(){
    // this.style.border= "px #ccc";
    this.style.border= "1px dashed #ccc";
    console.log("dragEnter");
}

function dragLeave(){
    // this.style.border= none;
    this.style.border= none;
    console.log("dragLeave");
}

function dragDrop(){
    // this.style.border= none;
    this.appendChild(draggableTodo);
    console.log("drop");
    this.style.border= none;
    this.appendChild(draggableTodo);
    console.log("dropped");
}

/* modelo*/
const btns = document.querySelectorAll("[data-target-modal]");
const close_btn = document.querySelectorAll(".modal-btn");
const overlay = document.querySelector("#overlay");


btns.forEach((btn) => {
    btn.addEventListener("click",()=>{
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});

close_btn.forEach((btn) => {
     btn.addEventListener("click",()=>{
         // document.querySelector(btn.dataset.target).classList.remove("active");
         btn.closest(".modal").classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (e) =>{
    if (e.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal)=> modal.classList.remove("active"));
        overlay.classList.remove("active")
    }
}

/* create todo */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click",createTodo);

function createTodo() {
    const todo_div = document.createElement("div");
    const input_val = document.getElementById("todo_input").value;
    const txt = document.createTextNode(input_val);

    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
    
    /* CRIAR O SPAN */
    const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);

    todo_div.appendChild(span);

    no_status.appendChild(todo_div);

    span.addEventListener("click" , () =>{
        span.parentElement.style.display = "none";
    });
    

    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);

    document.getElementById("todo_input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) =>{
    btn.addEventListener("click" , () =>{
        btn.parentElement.style.display = "none";
    });
});

let [miliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int;

document.getElementById('startTimer').addEventListener
('click',() =>{
    int= setInterval(displayTimer,10);
});

document.getElementById("pauseTimer").addEventListener
('click',()=>{
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener
('click',()=>{
    clearInterval(int);
    [miliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerRe.innerHTML = '00: 00: 00';
});

function displayTimer() {
    miliseconds+=10;
    if(miliseconds==1000){
        miliseconds=0;
        seconds++;
        if(seconds==60){
            seconds=0
            minutes++;
            if(minutes==60){
                minutes=0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes <10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds: seconds;
    let ms= miliseconds <10 ? "0" + miliseconds: miliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s} `;
}