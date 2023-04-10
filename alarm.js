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
    // console.log(setAlarmListLen);
    for(let i= 0; i<setAlarmListLen; i++){
        let alarmEle = document.getElementById(`alarm-${setAlarmsList[i]}`);
        // console.log(alarmEle);
        let timeComp = alarmEle.getElementsByTagName("h1");
        // console.log(timeComp[0]);
        if(timeComp[0].textContent == `${h}:${m} ${ampm}`){
            console.log(`Alarm ringing for ${h}:${m} ${ampm}`);
        }

        let timeRemain = alarmEle.getElementsByTagName("h4");
        let hours1, minutes1, ampm1;
        hours1 = parseInt(timeComp[0].textContent.substring(0,2));
        minutes1 = parseInt(timeComp[0].textContent.substring(3,5));
        ampm1 = timeComp[0].textContent.substring(6);

        if(ampm1 == "AM") {
            if(hours1 == 12){
                hours1 = 0;
            }

        }

        else if(ampm1== "PM"){
            if(hours1 >=1 && hours1< 12){
                hours1 = hours1 + 12;
            }
        }

        let remHours = hours1 - h;
        let remMins = minutes1 - m;

        if(remHours < 0){
            remHours = remHours +  12;
        }

        if(remMins < 0){
            remMins = remMins +  60;
            remHours = remHours - 1;
        }

        timeRemain[0].innerHTML = `Alarm in ${remHours} hours ${remMins} minutes`;

        if(timeRemain[0].innerHTML== `Alarm in 0 hours 0 minutes`){
            
            timeRemain[0].style.visibility="hidden";
        }



    }

    

    // if (alarmTime === `${h}:${m} ${ampm}`) {
    //     ringtone.play();
    //     ringtone.loop = true;
    // }
}, 1000);

function setAlarm() {
    let time = `${selectionMenu[0].value}:${selectionMenu[1].value} ${selectionMenu[2].value}`;
    console.log(time);
    
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }

    // let alarmArrayLength = alarmList.length;

    let alarmObj = {
        alarmObjId : id,
        isAlarmObjSet: true,
        alarmObjTime : time,
        isDeleted: false
    }


    // console.log(alarmObj);

    alarmList.push(alarmObj);
    setAlarmsList.push(alarmObj["alarmObjId"]);

    if(alarmList.length >0){
        noAlarmBox.style.display = 'none';
    }

    sectionAlarms.innerHTML += `<section class="alarms" id="alarm-${id}">
                                    <section class="alarmTime">
                                        <h1 class="activatedH1">${time}</h1>
                                        <h4 class="remaining-time activatedH4">Alarm in 7 hours 57 minutes</h4>
                                    </section>

                                    <section class="set-unset">
                                        <section class="toggleButton" id="toggleButton-${id}" onclick="moveToggle(this.id)">
                                            <section class="circle">
                                            </section>
                                        </section>
                                    </section>

                                    <section class="deleteAlarm">
                                        <button class="delete" id="delAlrmBtn-${id}" onClick= "deleteAlarm(this.id)">Delete</button>
                                    </section>
                                </section>`


    id = id+1;





    // if (isAlarmSet) {
    //     alarmTime = "";
    //     ringtone.pause();
    //     content.classList.remove("disable");
    //     setAlarmBtn.innerText = "Set Alarm";
    //     return isAlarmSet = false;
    // }
    
}

function unsetAlarm(id){
    
    let mainId = id.substr(13);
    let eleId = "alarm-" + mainId;
    let mainIdInt = parseInt(mainId);
    let alarmElement = document.getElementById(eleId);
    let heading1Element = alarmElement.getElementsByTagName("h1");
    let heading4Element = alarmElement.getElementsByTagName("h4");
    // console.log(heading4Element);
    heading4Element[0].innerHTML = `Deactivated`;

    heading4Element[0].classList.add("alarmDeactivatedH4");
    heading1Element[0].classList.add("alarmDeactivatedH1");
    heading4Element[0].classList.remove("activatedH4");
    heading1Element[0].classList.remove("activatedH1");

    
    let indexFound = setAlarmsList.findIndex(findIndexFunc);
    function findIndexFunc(id1){
        return id1 == mainIdInt;
    }

    let temp = setAlarmsList[indexFound];
    setAlarmsList[indexFound] = setAlarmsList[setAlarmsList.length-1];
    setAlarmsList[setAlarmsList.length-1] = temp;

    setAlarmsList.pop();

    console.log(setAlarmsList);


}

function setAlarm2(id){
    console.log(id);
    let mainId = id.substr(13);
    let eleId = "alarm-" + mainId;
    let mainIdInt = parseInt(mainId);
    let alarmElement = document.getElementById(eleId);
    setAlarmsList.push(mainIdInt);

    let heading1Element = alarmElement.getElementsByTagName("h1");
    let heading4Element = alarmElement.getElementsByTagName("h4");
    heading4Element[0].classList.add("activatedH4");
    heading1Element[0].classList.add("activatedH1");
    // console.log(heading4Element);

    heading4Element[0].classList.remove("alarmDeactivatedH4");
    heading1Element[0].classList.remove("alarmDeactivatedH1");

    console.log(setAlarmsList);

}

function deleteAlarm(id){
    console.log(id);
    let mainId = id.substr(11);
    let eleId = "alarm-" + mainId;
    let mainIdInt = parseInt(mainId);
    let alarmElement = document.getElementById(eleId);
    alarmElement.remove();

    let indexFound = setAlarmsList.findIndex(findIndexFunc);
    function findIndexFunc(id1){
        return id1 == mainIdInt;
    }

    if(indexFound >=0){
        let temp = setAlarmsList[indexFound];
        setAlarmsList[indexFound] = setAlarmsList[setAlarmsList.length-1];
        setAlarmsList[setAlarmsList.length-1] = temp;

        setAlarmsList.pop();

        
    }

    console.log(setAlarmsList);
    


    let indexFound2 = alarmList.findIndex(findIndexFunc2);
    function findIndexFunc2(id1){
        return id1["alarmObjId"] == mainIdInt;
    }
    let tempEle = alarmList[indexFound2];
    alarmList[indexFound2] = alarmList[alarmList.length -1];
    alarmList[alarmList.length -1] = tempEle;

    alarmList.pop();

    console.log(alarmList);


    if(alarmList.length == 0){
        noAlarmBox.style.display = "flex";
    }

}

setAlarmButton.addEventListener("click", setAlarm);
