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
    selection_sort(number);
}


async function selection_sort(number) {
    for (let i = 0; i < number - 1; i++) {
        let mini = i;
        for (let j = i + 1; j < number; j++) {
            // Highlight the elements being compared
            await highlightBars(i, mini, j);

            if (array[j] < array[mini]) {
                mini = j;
                // Highlight the new mini
                await highlightBars(i, mini, j);
            }
        }

        // Swap if mini is not the same as i
        if (mini != i) {
            await swap_number(i, mini);
        }
    }
    let bars = document.querySelectorAll('.bars');
    bars[number-2].style.backgroundColor='gray';
    bars[number-1].style.backgroundColor='gray';

}

function highlightBars(i, mini, j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Reset all bars to default color
            bars.forEach(bar => bar.style.backgroundColor = 'gray');

            // Highlight the bars
            bars[i].style.backgroundColor = 'blue'; // Current position being compared
            bars[mini].style.backgroundColor = 'green'; // Minimum so far
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
        }, 1000); // 500ms delay for visualization
    });
}