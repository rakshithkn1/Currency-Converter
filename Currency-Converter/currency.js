const URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")

for(let select of dropdowns){
    for (currcode in countryList){
let newoption=document.createElement("option");
newoption.innerText=currcode;
newoption.value=currcode
if(select.name==="from" && currcode==="USD"){
    newoption.selected="selected"
}else
if(select.name==="to" && currcode==="INR"){
    newoption.selected="selected"
}
select.appendChild(newoption)
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target)
    })
}

const updateflag=(element)=>{
let currcode=element.value
let countryCode=countryList[currcode]
let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
let img=element.parentElement.querySelector("img")
img.src=newsrc
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault()
    let ammount = document.querySelector(".ammount input")
    let amtval = ammount.value;
    if(amtval==="" && amtval<1){
        amtval=1
        ammount.value="1"
    }
    // console.log(fromCurr.value,toCurr.value)
 const BaseURL=`${URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
 let response=await fetch(BaseURL);
 let data=await response.json()
 let rate=data[toCurr.value.toLowerCase()]
 console.log(rate)
let finalammount=amtval*rate;
msg.innerText=`${amtval} ${fromCurr.value} = ${finalammount} ${toCurr.value}`
});