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
    merge_sort(0,number-1);
}

// async function merge_sort(low,high){
//     if(low<high){
//         //highlighting the whole subarray with black
//         let mid=(low+high)/2;
//         //highlighting the mid with green
//         merge_sort(low,mid);
//         merge_sort(mid+1,high);
//         merge_sort(low,high,mid);
//     }
// }

async function merge_sort(low, high) {
    if (low < high) {
        // Highlight the current subarray being processed
        await highlightSubArray(low, high, 'black');

        let mid = Math.floor((low + high) / 2);

        // Highlight the midpoint
        // await highlightMidpoint(mid, 'green');

        // Recursively sort the left and right halves
        await merge_sort(low, mid);
        await merge_sort(mid + 1, high);

        // Merge the sorted halves
        await merge(low, mid, high);

        // Reset the current subarray to gray after processing
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
        }, 300); // 300ms delay for visualization
    });
}

// function highlightMidpoint(index, color) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             let bars = document.querySelectorAll('.bars');

//             // Highlight the midpoint
//             bars[index].style.backgroundColor = color;

//             resolve();
//         }, 300); // 300ms delay for visualization
//     });
// }

async function merge(low, mid, high) {
    let bars = document.querySelectorAll('.bars');

    let left = array.slice(low, mid + 1);
    let right = array.slice(mid + 1, high + 1);

    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
        // Highlight elements being compared
        await highlightComparison(k, i + low, j + mid + 1);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            bars[k].style.height = left[i] + '%';
            i++;
        } else {
            array[k] = right[j];
            bars[k].style.height = right[j] + '%';
            j++;
        }
        k++;
    }

    // Copy the remaining elements from the left subarray
    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = left[i] + '%';
        i++;
        k++;
    }

    // Copy the remaining elements from the right subarray
    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = right[j] + '%';
        j++;
        k++;
    }
}
function highlightComparison(mainIndex, leftIndex, rightIndex) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bars = document.querySelectorAll('.bars');

            // Reset all bars to gray
            bars.forEach(bar => bar.style.backgroundColor = 'gray');

            // Highlight the main bar being updated
            bars[mainIndex].style.backgroundColor = 'blue';

            // Highlight the compared bars
            if (leftIndex < bars.length) bars[leftIndex].style.backgroundColor = 'red';
            if (rightIndex < bars.length) bars[rightIndex].style.backgroundColor = 'yellow';

            resolve();
        }, 300); // 300ms delay for visualization
    });
}
