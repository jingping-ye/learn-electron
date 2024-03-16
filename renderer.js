const submitBtn =  document.querySelector("button");
submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const {path} = document.querySelector("input").files[0];
    videoAPI.videoPath(path);
})

videoAPI.onVideoDuration((duration)=>{
    document.getElementById("info").innerHTML=`这个视频时长为 ${duration} 秒。`
})