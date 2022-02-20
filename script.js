const gridContainer=document.querySelector('.gridContainer')

for(let i=0;i<16;i++){
    let gridRow = document.createElement('div');
    gridRow.classList.add(`gridRow`)
    gridContainer.append(gridRow);
    for(let j=0;j<16;j++){
        let square=document.createElement('div');
        square.classList.add('square');
        gridRow.append(square)
    }
}