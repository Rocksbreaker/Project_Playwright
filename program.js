//frequency of character in a string
function freqency(){
    let str = "Welcome World";
    let freq = {};
    for(let char of str){
        if(char !== ""){
            freq[char] = (freq[char] || 0) + 1;
        }
    }
    console.log(freq)
}

freqency()

//Find the duplicate characters in int
let arr = [1,2,3,4,1,2,5];
let duplicate = arr.filter((item,index)=>arr.indexOf(item)!== index);
console.log(duplicate)
console.log([...new Set(duplicate)])