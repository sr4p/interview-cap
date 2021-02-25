console.log("Part A")
console.log("\n")

// ข้อ 1
function Fib(input){
    return (input == 1) ? 1 : (input == 2) ? 1 : Fib(input-1) + Fib(input-2); 
}

console.log(Fib(1))
console.log(Fib(3))
console.log(Fib(12))
console.log("\n")

// ข้อ 2
function arrShift(arr = [],move,num){
    for (var i = 0; i < num; i++ ){
        (move == 'left') ? arr.push(arr.shift()) : arr.unshift(arr.pop())
    }
    return arr;
}
console.log(arrShift(['john', 'jane', 'sarah', 'alex'], 'left', 2))
console.log(arrShift([1, 2, 3, 4 ,5], 'right', 3))
console.log("\n")


// ข้อ 4
function fizzBuzz(num){
    const map = {
        3:'Fizz',
        5:'Buzz',
        8:'Fizzbuzz'
    }

    const fizz = num%3* -1 + 3
    const buzz = num%5+5
    const fizzbuzz = (num%3 * -1 + 3) + (num%5+5)
    const value = map[fizzbuzz]  || map[fizz] || map[buzz]
    
    // console.log(fizz)
    // console.log(buzz)
    // console.log(fizzbuzz)
    return value;
}
console.log(fizzBuzz(21))
console.log(fizzBuzz(25))
console.log(fizzBuzz(45))
console.log("\n")



// ข้อ 3
function secondMax(arr){
//     if(!arr.length){
//         return "Error!"
//     }

//     var result = arr.sort((a,b)=>{
//         return a - b;
//     })

//     for (var i = result.length - 1; i >= 0; i--) {
        
//         var j = 0;

//         if(i == 0){
//             console.log(result)
//             return ` ${result[i]} index ${i} => 1`;
//         }
//         if(result[i] >= result[i-1]) {
//             console.log(result);
//             if(result[i] == result[i-1]){
//                 j++;
//                 return ` ${result[i-j]} index ${i-j} => 2`;
//             } 
            
//             return ` ${result[i-1]} index ${i-1} => 2`;
//         }
//     }
}
// console.log(secondMax([2, 3, 4, 5]))
// console.log(secondMax([9, 2, 21, 21]))
// console.log(secondMax([4, 4, 4, 4]))
// console.log(secondMax([4123]))
// console.log(secondMax([]))