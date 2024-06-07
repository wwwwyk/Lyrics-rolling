const lrcSplit = lrc.split('\n');
let timeArr = [];
let lrcArr = [];
let timeIndex = 0;

const domcontainer = document.getElementsByClassName('container')[0];
const domul = document.getElementsByTagName('ul')[0];
const domaudio = document.getElementsByTagName('audio')[0];

// 实现歌词和时间的分离
lrcSplit.forEach((item,index)=>{
    let arr = item.slice(1).split(']');
    timeArr[index] = timeTrans(arr[0]);
    lrcArr[index] = arr[1];

    // 将歌词li放入列表中
    const domli = document.createElement('li');
    domli.innerText = arr[1];
    domul.appendChild(domli);
})

const domli = document.getElementsByTagName('li')[0];
const baseTransform = domcontainer.clientHeight/2-domli.clientHeight/2;
domul.style.transform = "translateY("+baseTransform+"px) ";

// 时间处理函数 audio标签读取 currentTime 属性将返回一个双精度浮点值，用以标明以秒为单位的当前音频的播放位置。
function timeTrans(time){
    let min =  time.split(':')[0];
    let sec =  time.split(':')[1].split('.')[0];
    let newTime = min * 60 + sec * 1;
    return newTime;
}

// 获取现在播放的时间，找到对应的歌词下标
function getIndex(){
    let nowTime = domaudio.currentTime;
    let timeLength = timeArr.length;

    for(let index=0;index<timeLength;index++){
        if(nowTime > timeArr[index] && nowTime < timeArr[index+1]){
            timeIndex = index;
            return;
        }
    }
}


function setOffSet(){
    getIndex();
    let offset = timeIndex * domli.clientHeight - baseTransform;
    domul.style.transform = "translateY(-"+offset+"px) ";

    //设置样式
    if(document.querySelectorAll('.active').length>0){
        document.querySelectorAll('.active')[0].className = "";
    }
    document.getElementsByTagName('li')[timeIndex].className = "active";
}

// timeupdate	由 currentTime 指定的时间更新。
domaudio.addEventListener('timeupdate',function(){
    setOffSet();
})