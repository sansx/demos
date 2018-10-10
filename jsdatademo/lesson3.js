// js模拟栈


{
//classic
function Stack(){
    this.items = []
}

Stack.prototype = {
    constructor: Stack,
    push(el){
        this.items.push(el)
    },
    pop(){
        return this.items.pop()
    },
    peek(){
        return this.items[this.items.length - 1]
    },
    isEmpty(){
        return this.items.length == 0
    },
    size(){
        return this.items.length
    },
    clear(){
        this.items = []
    },
    print(){
        console.log(this.items.toString());
    }
}

let stack = new Stack()
console.log(stack.isEmpty());
}

//es6
    //fn1:属性为公共属性可以随意修改
{
class Stack{
    constructor(){
        this.items = []
    }
    push(el){
        this.items.push(el)
    }
    //....
}
}

/* fn2:将Symbol类型作为对象的属性
* 会被Object.getOwnPropertySymbols方法获取所有的Symbols属性
*/
{
    let _items = Symbol()
    class Stack{
        constructor(){
            this[_items] = []
        }
        //....
    }
    let stack = new Stack()
    let objSym = Object.getOwnPropertySymbols(stack)
    stack[objSym[0]].push(1) //即可添加元素，不可取
}

/**fn3:用WeakMap实现
 * 使用此方法扩展类无法继承私有属性
 */
let Stack = (function(){
    const items = new WeakMap()
    class Stack{
        constructor(){
            items.set(this,[])
        }
        push(el){
            let s = items.get(this)
            s.push(el)
        }
        pop(){
            let s = items.get(this)
            let r = s.pop()
            return r
        }
        peek(){
            let s = items.get(this)
            return s[s.length - 1]
        }
        isEmpty(){
            let s = items.get(this)
            return s.length == 0
        }
        size(){
            let s = items.get(this)
            return s.length
        }
        clear(){
            items.set(this,[])
        }
        print(){
            let s = items.get(this)
            console.log(s.toString());
        }
    }
    return Stack
})()

export default Stack



