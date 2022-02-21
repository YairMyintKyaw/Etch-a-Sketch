const gridContainer=document.querySelector('.gridContainer')
const clearedBtn=document.querySelector('.clearedBtn')
const randomColor=document.querySelector('.randomColor')
const userColorChoice=document.querySelector('.userColorChoice')
let numberOfRow=16; // initial row
let numberOfColumn=16;// initial column
createBoard(numberOfRow,numberOfColumn)

//Create board
function createBoard(row,column){
    gridContainer.style.height=`${gridContainer.offsetWidth}px`
    if(document.body.offsetHeight<document.body.offsetWidth) gridContainer.style.width=`${gridContainer.offsetHeight}px`
    for(let i=0;i<row;i++){
        let gridRow = document.createElement('div');
        gridRow.classList.add(`gridRow`)
        gridContainer.append(gridRow);
        for(let j=0;j<column;j++){
            let square=document.createElement('div');
            square.classList.add('square');
            if(i%2==0){
                if(j%2!==0) square.classList.add('grayBackground')
            }else{
                if(j%2==0) square.classList.add('grayBackground')
            }
            
            gridRow.append(square)
            square.addEventListener('mouseover',()=>{
                square.style.backgroundColor='black'
            })
        }
    }
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
function setHoverEffect(color){
    const squares = document.querySelectorAll('.square')
    squares.forEach((square)=>{
        square.addEventListener('mouseover',()=>{
            try{
                square.style.backgroundColor=color()
            }catch{
                square.style.backgroundColor=color
            }
        })
    })
}
//Set the current color
let currentColor;
//Random color
function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber =Math.floor( Math.random() * maxVal); 
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
randomColor.addEventListener('click',()=>{
    setHoverEffect(generateRandomColor)
    currentColor=generateRandomColor()
})

//user choosing color
userColorChoice.addEventListener('change',(e)=>{
    const colorCode=e.target.value
    setHoverEffect(colorCode)
    currentColor=colorCode
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
    
    option.addEventListener('click',()=>{
        let optionValue = option.value; numberOfColumn=optionValue;numberOfRow=optionValue;
        
        if(optionValue=='ratio') return;
        //else if(optionValue=='customize') {}
        gridContainer.innerHTML=''
        
        createBoard(+optionValue,+optionValue)
        setTimeout(() => {
            clearedBtn.click()
        }, 500);
    })
})

