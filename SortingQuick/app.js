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
    quick_sort(0,number-1);
}

// function quick_sort(low,high){
//     if(high>low){
//         let pivot=Math.floor(Math.random()*100)%(high-low+1);
//         pivot+=low;
//         //highlighting the pivot in green color with delay 300ms
//         pivot=partition(low,pivot,high);
//         quick_sort(low,pivot-1);
//         quick_sort(pivot+1,high);
//     }
// }

// async function quick_sort(low, high) {
//     if (high > low) {
//         let pivot = Math.floor(Math.random() * (high - low + 1)) + low;

//         // Highlight the pivot
//         await highlightPivot(pivot);

//         pivot = await partition(low, pivot, high);

//         await quick_sort(low, pivot - 1);
//         await quick_sort(pivot + 1, high);
//     }
// }

async function quick_sort(low, high) {
    if (high > low) {
        // Highlight the current subarray being processed
        await highlightSubArray(low, high, 'black');

        let pivot = Math.floor(Math.random() * (high - low + 1)) + low;

        // Highlight the pivot
        await highlightPivot(pivot);

        pivot = await partition(low, pivot, high);

        await quick_sort(low, pivot - 1);
        await quick_sort(pivot + 1, high);

        // Reset the color of the subarray to gray after processing
        await highlightSubArray(low, high, 'gray');
    }
}

function highlightSubArray(start, end, color) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Highlight the subarray from start to end
            for (let i = start; i <= end; i++) {
                bars[i].style.backgroundColor = color;
            }

            resolve();
        }, 500); // 300ms delay for visualization
    });
}


function highlightPivot(index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Reset all bars to default color
            bars.forEach(bar => bar.style.backgroundColor = 'gray');

            // Highlight the pivot
            bars[index].style.backgroundColor = 'green';

            resolve();
        }, 300); // 300ms delay for visualization
    });
}

async function partition(low, pivot, high) {
    let bars = document.querySelectorAll('.bars');

    // Highlight the pivot initially
    await highlightPivot(pivot);

    // Swap the pivot with the last element
    [array[pivot], array[high]] = [array[high], array[pivot]];
    [bars[pivot].style.height, bars[high].style.height] = [bars[high].style.height, bars[pivot].style.height];
    pivot = high;

    let i = low;

    for (let j = low; j < high; j++) {
        // Highlight elements being compared
        await highlightComparison(i, j, pivot);

        if (array[j] < array[pivot]) {
            // Swap elements at i and j
            [array[i], array[j]] = [array[j], array[i]];
            [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
            i++;
        }
    }

    // Highlight the pivot before placing it in the correct position
    await highlightPivot(pivot);

    // Swap pivot to the correct position
    [array[i], array[pivot]] = [array[pivot], array[i]];
    [bars[i].style.height, bars[pivot].style.height] = [bars[pivot].style.height, bars[i].style.height];

    // Highlight the pivot in its final position
    await highlightFinalPivot(i);

    return i; // Return new pivot index
}

function highlightPivot(index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Reset all bars to default color
            bars.forEach(bar => bar.style.backgroundColor = 'gray');

            // Highlight the pivot
            bars[index].style.backgroundColor = 'green';

            resolve();
        }, 300); // 300ms delay for visualization
    });
}

function highlightComparison(i, j, pivot) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Reset all bars to default color
            bars.forEach(bar => bar.style.backgroundColor = 'gray');

            // Highlight the compared bars
            bars[i].style.backgroundColor = 'blue'; // Partition boundary
            bars[j].style.backgroundColor = 'blue'; // Current comparison
            bars[pivot].style.backgroundColor = 'green'; // Pivot remains highlighted

            resolve();
        }, 300); // 300ms delay for visualization
    });
}

function highlightFinalPivot(index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Highlight the pivot in its final position
            bars[index].style.backgroundColor = 'orange'; // Final position color

            resolve();
        }, 500); // 300ms delay for visualization
    });
}

