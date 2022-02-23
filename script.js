const gridContainer=document.querySelector('.gridContainer')
const clearedBtn=document.querySelector('.clearedBtn')
const randomColor=document.querySelector('.randomColor')
const userColorChoice=document.querySelector('.userColorChoice')
const darker=document.querySelector('.darker')
//Set the current color
let currentColor;
let numberOfRow=16; // initial row
let numberOfColumn=16;// initial column
createBoard(numberOfRow,numberOfColumn)
let isClicked=false;
gridContainer.addEventListener('mousedown',click)
gridContainer.addEventListener('touchstart',click)

function click(){
    isClicked=true;
    console.log('click')
}

window.addEventListener('mouseup',unclick)
window.addEventListener('touchend',unclick)
window.addEventListener('touchcancel',unclick)

function unclick(){
    isClicked=false;
    console.log('unclick')

}



//Create board
function createBoard(row,column){
    gridContainer.style.height=`${gridContainer.offsetWidth}px`;
    if(document.body.offsetHeight<document.body.offsetWidth) gridContainer.style.width=`${gridContainer.offsetHeight}px`
    for(let i=0;i<row;i++){
        let gridRow = document.createElement('div');
        gridRow.classList.add(`gridRow`)
        gridContainer.append(gridRow);
        for(let j=0;j<column;j++){
            let square=document.createElement('div');
            square.classList.add('square');
            //square.draggable="false"
            if(i%2==0){
                if(j%2!==0) square.style.backgroundColor='gainsboro'
            }else{
                if(j%2==0) square.style.backgroundColor='gainsboro'
            }
            
            gridRow.append(square)
            
            

            

            square.addEventListener('touchstart',initialColor)
            square.addEventListener('touchmove',initialDrawColorForTouch)
            square.addEventListener('mousedown',initialColor)
            square.addEventListener('mouseover',initialDrawColor)
        }
    }
    
}

function initialDrawColorForTouch(e){
    let secondElement=document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    console.log(document.elementsFromPoint)
    if(!isClicked) return;
    e.target.style.backgroundColor='black';
    if(secondElement.classList.contains('square')) secondElement.style.backgroundColor='black'
    e.preventDefault()
}
function initialDrawColor(e){
    if(!isClicked) return;
    e.target.style.backgroundColor='black';
    e.preventDefault()
}
function initialColor(e){
    e.target.style.backgroundColor='black';
    console.log(e.target)
    e.preventDefault()

}


//In case any rotation happens
window.addEventListener('resize',()=>{
    console.log(gridContainer.offsetWidth)
    gridContainer.style.height=`${gridContainer.offsetWidth}px`
    if(document.body.offsetHeight<document.body.offsetWidth) gridContainer.style.width=`${gridContainer.offsetHeight}px`
    else if(document.body.offsetWidth<=500) {
        gridContainer.style.width='90%'
        gridContainer.style.height=`${gridContainer.offsetWidth}px`
    }
})

//square
let firstClick=false
function setHoverEffect(color){
    
    const squares = document.querySelectorAll('.square')
    squares.forEach((square)=>{
        if(firstClick){
            square.removeEventListener('touchstart',initialColor)
            square.removeEventListener('touchmove',initialDrawColorForTouch)
            square.removeEventListener('mousedown',initialColor)
            square.removeEventListener('mouseover',initialDrawColor)
        }
        let red=60;
        let green=60;
        let blue=60;
        square.addEventListener('mousedown',changeBackgroundWithClick)
        square.addEventListener('touchstart',changeBackgroundWithClick)
        square.addEventListener('mouseover',changeBackgroundWhileDrag)
        square.addEventListener('touchmove',changeBackgroundWhileDragWithTouch)
        
        function changeBackgroundWithClick(e){
            //e.stopPropagation()
            changeBackground(square)
        }

        function changeBackgroundWhileDragWithTouch(e){
            let secondElement=document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            if(!isClicked || !secondElement.classList.contains('square')) return
            changeBackground(secondElement)
        }

        function changeBackgroundWhileDrag(e){
            //e.stopPropagation()
            if(!isClicked) return
            changeBackground(square)
        }
        function changeBackground(square){
            
            try{
                if(color()[0]!='#'){
                    if(square.style.backgroundColor=='rgb(0%,0%,0%)') {
                        return;
                    };
                    red-=6;
                    green-=6;
                    blue-=6;
                    square.style.backgroundColor=color(red,green,blue)
                }
                else{
                    square.style.backgroundColor=color()
                }
            }catch{
                square.style.backgroundColor=color
            }
            
        
    }
    })
}

document.body.style.backgroundColor='rgb(30%,25%,100%)'

//Random color
function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber =Math.floor( Math.random() * maxVal); 
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
randomColor.addEventListener('click',()=>{
    firstClick=true;
    setHoverEffect(generateRandomColor)
    currentColor=generateRandomColor
})

//user choosing color
userColorChoice.addEventListener('change',(e)=>{
    function colorCode(){
        return e.target.value
    }
    setHoverEffect(colorCode)
    currentColor=colorCode
    
})
function darkerColor(r,g,b){
    return `rgb(${r}%,${g}%,${b}%)`
}
//darker


darker.addEventListener('click',()=>{
    firstClick=true;

    setHoverEffect(darkerColor)
    currentColor=darkerColor
})



//Clear the board
clearedBtn.addEventListener('click',()=>{
    gridContainer.innerHTML=''
    createBoard(numberOfRow,numberOfColumn)
    setHoverEffect(currentColor)
})

//Change the board according to the ratio

const options = document.querySelectorAll('option')
options.forEach((option)=>{
    
    option.addEventListener('click',changeTheBoard)
    option.addEventListener('touchstart',changeTheBoard)
})

function changeTheBoard(e){
    let optionValue = e.target.value; numberOfColumn=optionValue;numberOfRow=optionValue;
    
    if(optionValue=='ratio') return;
    //else if(optionValue=='customize') {}
    gridContainer.innerHTML=''
    
    createBoard(+optionValue,+optionValue)
    setTimeout(() => {
        clearedBtn.click()
    }, 500);
}

