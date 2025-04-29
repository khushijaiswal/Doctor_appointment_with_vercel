// addition of odd number in an array

const arr = [1, 2, 3, 4, 5]
let sum = 0
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
        sum = sum + arr[i]
    }
}
// console.log(sum)

// fibbonacci

// const fib = [0, 1]
// let temp = 0
// const fibbo = (num) => {
//     for (let i = 0; fib.length < num; i++) {
//         temp = fib[i] + fib[i + 1]
//         fib.push(temp)
//         console.log(temp)
//     }
//     return fib

// }
// console.log(fibbo(5))


// Prime number

// const prime = (num) => {
//     if (num % 2 == 0) {
//         return console.log(num, "not a prime number")
//     } else {
//         console.log(num, "is a prime number")
//     }
// }
// console.log(prime(12))


// fizz buzz

// multiple of 3 => fizz 
// multiple of 5 => buzz

// multiple of both => fizzBuzz

// const fizzBuz = (num) => {
//     const array = []
//     for (let i = 0; i < num; i++) {
//         array.push(i)
//         // console.log(array)
//     }

//     for (let j = 0; j < num; j++) {
//         if (array[j] % 3 == 0 && array[j] % 5 == 0) {
//             console.log('fizzBuzz')
//         }
//         if (array[j] % 3 == 0) {
//             console.log('fizz')
//         } else if (array[j] % 5 == 0) {
//             console.log('buzz')
//         } else {
//             console.log(array[j])
//         }
//     }
// }
// // console.log(fizzBuz(10))
// fizzBuz(15)

// odd even

// const checkNum = (num) => {
//     if (num % 2 == 0) {
//         return console.log(num, "is a even number")
//     } else {
//         console.log(num, "is odd number")
//     }
// }
// console.log(checkNum(15))


// Armstrong number

// const isArmstrong = (num) => {
//     let sum = 0
//     let arr = num.split('')
//     // console.log(typeof (arr))
//     for (let i = 0; i < arr.length; i++) {
//         arr[i] = arr[i] ** 3
//     }
//     for (let j = 0; j < arr.length; j++) {
//         sum = sum + arr[j]
//     }

//     if (sum == num) {
//         return console.log(num, "its a armstrong")
//     } else {
//         console.log(num, "not a armstrong")
//     }
// }

// console.log(isArmstrong('153'))



// selection sort

// const arrr = [4, 2, 3, 5, 6, 7]
// const selectionSort = (arrr) => {
//     for (let i = 0; i < arrr.length; i++) {
//         let min = i
//         let temp = 0
//         for (let j = i + 1; j < arrr.length; j++) {
//             if (arrr[j] < arrr[min]) {
//                 min = j
//             }
//             if (i !== min) {
//                 temp = arrr[i]
//                 arrr[i] = arrr[min]
//                 arrr[min] = temp
//             }
//         }
//     }
//     return arrr
// }
// console.log(selectionSort(arrr))


// bubble sort

const arrr = [4, 2, 3, 5, 6, 7]
const bubbleSort = (arrr) => {
    const arrr = [43, 20, 96, 45, 89, 3]
    let temp
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arrr
}
console.log(bubbleSort(arrr))