inputSection = document.querySelector("#input-section"),
selectionMenu = document.querySelectorAll("select"),
setAlarmButton = document.querySelector("#ok");
sectionAlarms = document.querySelector("#alarms");
noAlarmBox = document.querySelector(".no-alarm-box");
// let alarmTime, isAlarmSet,
// ringtone = new Audio("./files/ringtone.mp3");

let alarmList = [];
let setAlarmsList = [];
let deletedAlarmsList = [];
let id = 0;
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectionMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectionMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectionMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    // currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    let setAlarmListLen = setAlarmsList.length;
    for(let i= 0; i<setAlarmListLen; i++){
        if(alarmList[setAlarmsList[i]]["alarmObjTime"] == `${h}:${m} ${ampm}`){
            console.log(`Alarm ringing for ${h}:${m} ${ampm}`);
        }
    }

    if(alarmList.length>0){
        // console.log(sectionAlarms);
        let totalAlarmsListLen = alarmList.length;
        let h4List = sectionAlarms.querySelectorAll(".remaining-time");
        // console.log(h4List);
        for(let j = 0; j< h4List.length; j++){
            let hours1, minutes1;
            hours1 = alarmList[j]["alarmObjTime"].substring(0,2)- h;
            minutes1 = alarmList[j]["alarmObjTime"].substring(3,5) - m;
            if(hours1 < 0){
                hours1 = hours1 +  12;
            }

            if(minutes1 < 0){
                minutes1 = minutes1 +  60;
                hours1 = hours1 - 1;
            }
            // if(alarmList[j]["alarmObjTime"].substring(0,2) > h){
            //     hours1 = alarmList[j]["alarmObjTime"].substring(0,2)- h;
                
            // }
            h4List[j].innerHTML= `Alarm in ${hours1} hours ${minutes1} minutes`;

            if(h4List[j].innerHTML== `Alarm in 0 hours 0 minutes`){
                h4List[j].style.visibility="hidden";
            }
        }
    }
    

    // if (alarmTime === `${h}:${m} ${ampm}`) {
    //     ringtone.play();
    //     ringtone.loop = true;
    // }
});

function setAlarm() {
    let time = `${selectionMenu[0].value}:${selectionMenu[1].value} ${selectionMenu[2].value}`;
    console.log(time);
    
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }

    let alarmArrayLength = alarmList.length;

    let alarmObj = {
        alarmObjIndex : alarmArrayLength,
        isAlarmObjSet: true,
        alarmObjTime : time,
        isDeleted: false
    }

    

    console.log(alarmObj);

    alarmList.push(alarmObj);
    setAlarmsList.push(alarmObj["alarmObjIndex"]);

    if(alarmList.length >0){
        noAlarmBox.style.display = 'none';
    }

    sectionAlarms.innerHTML += `<section class="alarms" id="alarm-${alarmList.length}">
                                    <section class="alarmTime">
                                        <h1>${time}</h1>
                                        <h4 class="remaining-time">Alarm in 7 hours 57 minutes</h4>
                                    </section>

                                    <section class="set-unset">
                                        <section class="toggleButton" id="toggleButton-${alarmList.length}" onclick="moveToggle(this.id)">
                                            <section class="circle">
                                            </section>
                                        </section>
                                    </section>

                                    <section class="deleteAlarm">
                                        <button class="delete">Delete</button>
                                    </section>
                                </section>`






    // if (isAlarmSet) {
    //     alarmTime = "";
    //     ringtone.pause();
    //     content.classList.remove("disable");
    //     setAlarmBtn.innerText = "Set Alarm";
    //     return isAlarmSet = false;
    // }
    
    // alarmTime = time;
    // isAlarmSet = true;
    // content.classList.add("disable");
    // setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmButton.addEventListener("click", setAlarm);
