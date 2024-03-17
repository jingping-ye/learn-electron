const {app, BrowserWindow,Menu, ipcMain} = require("electron");
const path = require("node:path");

let mainWindow;
let addWindow;

app.on("ready",()=>{
    mainWindow = new BrowserWindow({
        title:"TODO",
        webPreferences:{
            preload:path.join(__dirname,"preload.js")
        }
    });
    mainWindow.loadFile("main/main.html");
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu)
})

ipcMain.handle("item:add",(_,item)=>{
    console.log("item", item);
    mainWindow.webContents.send("item:add",item);
})


function createAddItemWindow(){
    addWindow = new BrowserWindow({
        width:350,
        height:200,
        title:"添加事项",
        webPreferences:{
            preload:path.join(__dirname,"preload.js")
        }
    });
    addWindow.removeMenu();
    addWindow.loadFile("addItem/addItem.html");
    addWindow.on("closed",()=>{
        addWindow = null;
    })
}


let menuTemplate = [
    {
        label:"待办事项",
        submenu:[
            {
                label:"新增",
                click: function () {
                    createAddItemWindow();
                }
            }
        ]
    },
    {
        label:"退出",
        accelerator:process.platform === "darwin"? "Command+Q":"Ctrl+Q",
        click:function(){
            app.quit();
        }
    },
    
];

if(process.platform === "darwin"){
    menuTemplate.unshift({});
}

if(process.env.NODE_ENV !== "production"){
    menuTemplate.push(
        {
            label:"开发者工具",
            click:function(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role:"reload"
        }
    )
}