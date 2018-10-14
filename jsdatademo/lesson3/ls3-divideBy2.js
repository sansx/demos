
import Stack from "./Stack.js"

let stack = new Stack()

/**进制转化*/


/**
 * 
 * @param {Number} decnum 
 * 二进制转化函数
 */
function divideBy2(decnum){
    let remStack = new Stack(),
    rem,
    binaryString = ""
    while(decnum>0){
        rem = Math.floor(decnum % 2)
        remStack.push(rem)
        decnum = Math.floor(decnum/2)
    }
    while(!remStack.isEmpty()){
        binaryString += remStack.pop().toString()
    }
    return binaryString
}
/**
 * 
 * @param {Number} num 
 * 创建10及以下的位数转换的函数
 */
function divideByN(num){
    return function(decnum){
        let remStack = new Stack(),
        rem,
        binaryString = ""
        while(decnum>0){
            rem = Math.floor(decnum % num)
            remStack.push(rem)
            decnum = Math.floor(decnum/num)
        }
        while(!remStack.isEmpty()){
            binaryString += remStack.pop().toString()
        }
        return binaryString
    }
}


let newfn = divideByN(2)
console.log(newfn(10));

