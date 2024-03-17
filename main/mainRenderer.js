const ul = document.querySelector("ul");

// 新增事项
itemAPI.onNewItem(item=>{
    console.log("onNewItem", item);
    const li = document.createElement("li");
    li.innerText = `${item}  `
    const button = document.createElement("button");
    button.innerText = "删除";
    li.appendChild(button);
    ul.appendChild(li);
})

// 删除事项
ul.addEventListener("click",(event)=>{
    const target = event.target;
    if(target.nodeName === "BUTTON"){
        const parentNode = target.parentNode;
        ul.removeChild(parentNode);
    }
})