let btn=document.querySelector('#start');

btn.addEventListener('click',function(){
    let number=document.querySelector('input').value;
    addDiv(number);
}); 

let array=[]; 

function addDiv(number){
    let boxes=document.querySelectorAll('.box div');
    array=[];
    //empty the box
    for(bx of boxes){
        bx.remove();
    }
    
    let container=document.querySelector('.box');
    for(let i=0;i<number;i++){
        let d=document.createElement('div');
        container.append(d);
        let percentage=Math.floor(Math.random()*100)+1;
        d.style.height=percentage+'%';
        d.classList.add('bars');
        d.classList.add(`${i}`);
        array.push(percentage);
    }
    bubble_sort(number);
}

async function bubble_sort(number) {
    for (let i = 0; i < number - 1; i++) {
        for (let j = 1; j < number-i; j++) {
            // Highlight the elements being compared
            await highlightBars(j-1,j);

            if (array[j] < array[j-1]) {
                await swap_number(j-1, j);
            }
        }
    }
    let bars = document.querySelectorAll('.bars');
    bars[0].style.backgroundColor='gray';
    bars[1].style.backgroundColor='gray';

}

function highlightBars(i,j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Reset all bars to default color
            bars.forEach(bar => bar.style.backgroundColor = 'gray');

            // Highlight the bars
            bars[i].style.backgroundColor = 'blue'; // Current position being compared
            bars[j].style.backgroundColor = 'blue'; // Current j being compared

            resolve();
        }, 300); // Delay for visualization
    });
}

function swap_number(i, j) {
    return new Promise((resolve) => {
        let change=document.querySelectorAll('.bars');
        change[i].style.backgroundColor="red";
        change[j].style.backgroundColor="red";
        setTimeout(() => {
            let contain = document.querySelectorAll('.bars');
            // Swap heights
            let height1 = contain[i].style.height;
            contain[i].style.height = contain[j].style.height;
            contain[j].style.height = height1;

            // Swap values in the array
            let num = array[i];
            array[i] = array[j];
            array[j] = num;
            contain[i].style.backgroundColor="black";
            contain[j].style.backgroundColor="black";
            resolve(); // Resolve after swapping
        }, 500); 
    });
}