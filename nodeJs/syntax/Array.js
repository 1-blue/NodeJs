var array = ['A', true, 3];

array.push(function(){
    return 10;
})

// for(var i=0; i< array.length; i++)
//     console.log(array[i]);

console.log(array[3]());