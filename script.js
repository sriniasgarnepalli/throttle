const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")

const updatedDebounceText = debounce(text=>{
    debounceText.textContent = text
})

const updatedThrottleText = throttle(text=>{
    throttleText.textContent = text
})

input.addEventListener("input",e=>{
    defaultText.textContent = e.target.value;
    updatedDebounceText(e.target.value)
    updatedThrottleText(e.target.value)
})


function throttle(cb, delay=1000){
    let shouldWait = false
    let waitingArgs;

    const timeoutFunction = () => {
        if(waitingArgs == null){
            shouldWait = false
        }else{
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunction, delay)
        }
    }
    return(...args)=>{
        if(shouldWait){
            waitingArgs = args
            return
        }

        cb(...args)
        shouldWait = true

        setTimeout(timeoutFunction, delay)
    }
}


function debounce(cb, delay=1000){
    let timeout
    return(...args)=>{
        console.log(timeout,"timeout")
        console.log(...args)
        clearTimeout(timeout)
       timeout = setTimeout(()=>{
            cb(...args)
        },delay)
    }
}