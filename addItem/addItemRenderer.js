document.querySelector("button").addEventListener("click", ()=>{
    const item = document.querySelector("input");
    itemAPI.addItem(item.value);
})