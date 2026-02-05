const beep = document.getElementById("beep");

function updateClock(){
  const now = new Date();
  document.getElementById("current-time").textContent =
    now.toLocaleTimeString("zh-CN",{hour12:false});
  document.getElementById("current-date").textContent =
    now.toLocaleDateString("zh-CN",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  checkAlarms(now);
}
setInterval(updateClock,1000);
updateClock();

let alarms = [];
const alarmList = document.getElementById("alarm-list");

document.getElementById("set-alarm").onclick = ()=>{
  const t = document.getElementById("alarm-time").value;
  if(!t) return alert("请选择时间");
  alarms.push(t);
  renderAlarms();
};

function renderAlarms(){
  alarmList.innerHTML="";
  alarms.forEach((t,i)=>{
    const li=document.createElement("li");
    li.innerHTML=`<span>${t}</span>
      <button onclick="deleteAlarm(${i})">删除</button>`;
    alarmList.appendChild(li);
  });
}
window.deleteAlarm=i=>{
  alarms.splice(i,1);
  renderAlarms();
}

function checkAlarms(now){
  const hh = String(now.getHours()).padStart(2,"0");
  const mm = String(now.getMinutes()).padStart(2,"0");
  const ss = String(now.getSeconds()).padStart(2,"0");
  const cur = `${hh}:${mm}`;
  if(ss==="00" && alarms.includes(cur)){
    beep.play();
    alert("⏰ 到点啦：" + cur);
  }
}

let timerInt=null,totalSec=0,remain=0;

const disp=document.getElementById("timer-display");
const mm=document.getElementById("timer-min");
const ss=document.getElementById("timer-sec");

document.getElementById("start-timer").onclick=()=>{
  if(!remain){
    totalSec=(+mm.value||0)*60+(+ss.value||0);
    remain=totalSec;
  }
  if(!remain) return;
  if(timerInt) return;
  timerInt=setInterval(()=>{
    remain--;
    showTimer();
    if(remain<=0){
      clearInterval(timerInt);timerInt=null;
      beep.play();alert("⏳ 倒计时结束");
    }
  },1000);
};
document.getElementById("pause-timer").onclick=()=>{
  clearInterval(timerInt);timerInt=null;
};
document.getElementById("reset-timer").onclick=()=>{
  clearInterval(timerInt);timerInt=null;
  remain=0;showTimer();
};
function showTimer(){
  const m=Math.floor(remain/60).toString().padStart(2,"0");
  const s=Math.floor(remain%60).toString().padStart(2,"0");
  disp.textContent=`${m}:${s}`;
}
showTimer();

let swInt=null, swMs=0;
const swDisp=document.getElementById("stopwatch-display");
const lapList=document.getElementById("lap-list");

document.getElementById("start-sw").onclick=()=>{
  if(swInt){clearInterval(swInt);swInt=null}
  else swInt=setInterval(()=>{
    swMs+=10;renderSW();
  },10);
};

document.getElementById("lap-sw").onclick=()=>{
  if(!swMs) return;
  const li=document.createElement("li");
  li.textContent=swDisp.textContent;
  lapList.appendChild(li);
};

document.getElementById("reset-sw").onclick=()=>{
  clearInterval(swInt);swInt=null;swMs=0;
  lapList.innerHTML="";renderSW();
};

function renderSW(){
  const m=Math.floor(swMs/60000).toString().padStart(2,"0");
  const s=Math.floor((swMs%60000)/1000).toString().padStart(2,"0");
  const cs=Math.floor((swMs%1000)/10).toString().padStart(2,"0");
  swDisp.textContent=`${m}:${s}.${cs}`;
}
renderSW();
