const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 500;
canvas.height = 700;
ctx.fillStyle = "#f6f9fc";
ctx.fillRect(0,0,500,700);


ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;

}

function startPainting(){
    painting = true;
}

function onMousemove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling){
        filling =false;
        mode.innerText="Fill";
    }else{
        filling = true;
        mode.innerText="paint";
    
}
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,500,700);
    }
    
}

function handleCM(event){ //우클릭방지
    event.preventDefault();
}

function handleSaveBtnClick(event){
    const image = canvas.toDataURL();
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "JSPAINT🖼";
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove",onMousemove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouesout", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveBtnClick);
}
