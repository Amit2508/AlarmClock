inputSection = document.querySelector("#input-section"),
selectionMenu = inputSection.querySelectorAll("select"),
setAlarmButton = document.querySelector("#ok");
sectionAlarms = document.querySelector("#alarms");
noAlarmBox = document.querySelector(".no-alarm-box");

mainSettings = document.querySelector("#main-settings");
selectionMenu2 = mainSettings.querySelectorAll("select");

let option1 = `<option value="alarm-tone-1">alarm-tone-1</option>`;
selectionMenu2[0].firstElementChild.insertAdjacentHTML("afterend", option1);
let option2 = '<option value="alarm-tone-2">alarm-tone-2</option>';
selectionMenu2[0].firstElementChild.insertAdjacentHTML("afterend", option2);
let option3 = '<option value="alarm-tone-3">alarm-tone-3</option>';
selectionMenu2[0].firstElementChild.insertAdjacentHTML("afterend", option3);

option1list = selectionMenu2[0].getElementsByTagName['option'];
console.log(option1list)

option2list = selectionMenu2[1].getElementsByTagName['option'];

for (let i = 4; i >= 1; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i} minutes</option>`;
    selectionMenu2[1].firstElementChild.insertAdjacentHTML("beforebegin", option);
}

for (let i = 6; i <= 30; i++) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i} minutes</option>`;
    selectionMenu2[1].lastElementChild.insertAdjacentHTML("afterend", option);
}



// let alarmTime, isAlarmSet,
ringtone = new Audio('alarm-tone/alarm-tone.mp3');

let alarmList = [];
let setAlarmsList = [];
let deletedAlarmsList = [];
let ringingAlarmsList = [];
let ringtoneObjArray = [];
let id = 0;
let numAlarmsRinging = 0;

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
    h1 = h;
    m1 = m;
    
    ampm = "AM";
    ap1 = ampm;
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
            let temporary = setAlarmsList[i];
            setAlarmsList[i] = setAlarmsList[setAlarmsList.length -1];
            setAlarmsList[setAlarmsList.length -1] = temporary;

            setAlarmsList.pop();
            ringingAlarmsList.push(temporary);
            console.log(ringingAlarmsList)
            console.log(setAlarmsList);
            ringAlarm(temporary, timeComp[0].textContent);
        }

        else{
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

        let remHours = hours1 - parseInt(h1);
        let remMins = minutes1 - parseInt(m1);

        console.log(remHours, remMins);

        if(remHours == 0 && remMins == 0){
            remHours = 0;
            remMins = 0;
        }
        else if(remHours == 0 && remMins < 0){
            remMins = remMins +  60;
            remHours = remHours + 23;
        }

        else{
            if(remHours < 0){
                remHours = remHours + 24;
            }
    
            if(remMins < 0){
                remMins = remMins +  60;
                remHours = remHours - 1;
            }

        }

        

        

        timeRemain[0].innerHTML = `Alarm in ${remHours} hours ${remMins} minutes`;

        if(timeRemain[0].innerHTML== `Alarm in 0 hours 0 minutes`){

            // timeRemain[0].style.visibility="hidden";
            let temporary = setAlarmsList[i];
            setAlarmsList[i] = setAlarmsList[setAlarmsList.length -1];
            setAlarmsList[setAlarmsList.length -1] = temporary;

            setAlarmsList.pop();
            ringingAlarmsList.push(temporary);
            console.log(ringingAlarmsList)
            ringAlarm(temporary, timeComp[0].textContent);


        }

    }



    }

}, 1000);

function checkRinging(){
    if(numAlarmsRinging == 1){
        ringtoneObjArray = new Audio(`../ringtone/${selectionMenu2[0].value}.mp3`);
        console.log("here");
        ringtoneObjArray.play();
        
        ringtoneObjArray.loop = true;
    }
}

function ringAlarm(id, content){
        numAlarmsRinging = numAlarmsRinging+1;
        if(numAlarmsRinging == 1){
            checkRinging();
        }
        
        // if(numAlarmsRinging == 0){
        //     ringtoneObjArray[id] = new Audio('../ringtone/alarm-tone.mp3');
        //     console.log("here");
        //     ringtoneObjArray[id].play();
            
        //     ringtoneObjArray[id].loop = true;
        // }
        
        // console.log(setAlarmListLen);
        let ringingAlarmEle = document.getElementById(`alarm-${id}`);
        console.log("ringinggg..");
        // console.log(ringingElement.innerHTML)

        let previousHtml = ringingAlarmEle.innerHTML;
        console.log(previousHtml);
        let argument = id + "#" + previousHtml;
        console.log(argument);  
        ringingAlarmEle.innerHTML = `<section class="alarmTime">
                                        <h1 class="ringingHeading">${content}</h1>
                                        <h4 class="ringingSubHeading">Alarm Ringing...</h4>
                                    </section>

                                    <section class="stop-alarm">
                                        <button class="stop-button" id="stopButton-${id}" onclick= "stopAlarm(${id})"> STOP ALARM </button>
                                    </section>

                                    <section class="snooze-alarm">
                                        <button class="snooze-button" id="snoozeButton-${id}" onClick= "snoozeAlarm(${id})">SNOOZE ALARM</button>
                                    </section>`
}

function snoozeAlarm(id){
    console.log("here1");
    ringtoneObjArray.pause();
    numAlarmsRinging = numAlarmsRinging -1;
    if(numAlarmsRinging >=1){
        checkRinging();
    }

    let ringingAlarmEle = document.getElementById(`alarm-${id}`);
    let heading1Element = ringingAlarmEle.getElementsByTagName("h1");
    let time = heading1Element[0].innerHTML;
    // let hours1, minutes1, ampm1;
    // hours1 = parseInt(time.substring(0,2));
    // minutes1 = parseInt(time.substring(3,5));
    // ampm1 = time.substring(6);

    // if(ampm1 == "AM") {
    //     if(hours1 == 12){
    //         hours1 = 0;
    //     }

    // }

    // else if(ampm1== "PM"){
    //     if(hours1 >=1 && hours1< 12){
    //         hours1 = hours1 + 12;
    //     }
    // }
    // let d = new Date(2023, 4, 11, hours1, minutes1);
    let d = new Date();
    console.log(d);
    d.setMinutes(d.getMinutes()+ parseInt((selectionMenu2[1].value).substr(0,2)));
    console.log(d);

    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds(),
    
    ampm = "AM";
    
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    newTime = (`${h}:${m} ${ampm}`);


    let previousHtml = `<section class="alarmTime">
                            <h1 class="activatedH1">${newTime}</h1>
                            <h4 class="remaining-time activatedH4">(Snoozed for 1 minute)</h4>
                        </section>

                        <section class="set-unset">
                            <section class="toggleButton" id="toggleButton-${id}" onclick="moveToggle(this.id)">
                                <section class="circle">
                                </section>
                            </section>
                        </section>

                        <section class="deleteAlarm">
                            <button class="delete" id="delAlrmBtn-${id}" onclick="deleteAlarm(this.id)">Delete</button>
                        </section>`
    
    ringingAlarmEle.innerHTML = previousHtml;
    
    setAlarmsList.push(id);
    console.log(setAlarmsList);
    // let buttonObj = document.getElementById("toggleButton-" + id);
    // let styling = getComputedStyle(buttonObj);
    // if(styling.flexDirection == "row"){
    //     buttonObj.classList.add("move-toggle");
    //     buttonObj.classList.remove("toggleButton");
    // }
    // unsetAlarm("toggleButton-" + id);


}

function stopAlarm(id){
    

    console.log("here1");
    ringtoneObjArray.pause();
    numAlarmsRinging = numAlarmsRinging -1;
    if(numAlarmsRinging >=1){
        checkRinging();
    }

    let ringingAlarmEle = document.getElementById(`alarm-${id}`);
    let heading1Element = ringingAlarmEle.getElementsByTagName("h1");
    let time = heading1Element[0].innerHTML;

    let previousHtml = `<section class="alarmTime">
                            <h1 class="activatedH1">${time}</h1>
                            <h4 class="remaining-time activatedH4">Deactivated</h4>
                        </section>

                        <section class="set-unset">
                            <section class="toggleButton" id="toggleButton-${id}" onclick="moveToggle(this.id)">
                                <section class="circle">
                                </section>
                            </section>
                        </section>

                        <section class="deleteAlarm">
                            <button class="delete" id="delAlrmBtn-${id}" onclick="deleteAlarm(this.id)">Delete</button>
                        </section>`
    
    ringingAlarmEle.innerHTML = previousHtml;
    let buttonObj = document.getElementById("toggleButton-" + id);
    let styling = getComputedStyle(buttonObj);
    if(styling.flexDirection == "row"){
        buttonObj.classList.add("move-toggle");
        buttonObj.classList.remove("toggleButton");
    }
    unsetAlarm("toggleButton-" + id);
}

function setAlarm() {
    console.log(selectionMenu);
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
                                        <h4 class="remaining-time activatedH4">Alarm in 0 hours 0 minutes</h4>
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

    if(indexFound >= 0){
    let temp = setAlarmsList[indexFound];
    setAlarmsList[indexFound] = setAlarmsList[setAlarmsList.length-1];
    setAlarmsList[setAlarmsList.length-1] = temp;

    setAlarmsList.pop();
    }

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
