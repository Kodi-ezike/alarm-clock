import { useState, useRef, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoIosAlarm } from "react-icons/io";
import sound from "./assets/alarm.mp3";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const Clock = () => {
  const alarmSound = new Audio(sound);
  const [alarmArray, setAlarmArray] = useState([]);
  const [ampm, setAmpm] = useState("");
  const [minuteInput, setMinuteInput] = useState(0);
  const [hourInput, setHourInput] = useState(0);
  const [timeInput, setTimeInput] = useState("AM");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);
  const appendZeroTimer = (value) => (value < 10 ? "0" + value : value);
  let alarmObj = [];
  // to set properties of the alarm array
  alarmObj.id = uuidv4();
  alarmObj.alarmHour = appendZeroTimer(hourInput);
  alarmObj.alarmMinute = appendZeroTimer(minuteInput);
  alarmObj.alarmSeconds = "00";
  alarmObj.alarmTime = timeInput;
  alarmObj.isActive = active;

  useEffect(() => {

    const displayTimer = () => {
      let date = new Date();
      //date time manipulation to get current time
      setHours(appendZeroTimer(date.getHours()));
      setMinutes(appendZeroTimer(date.getMinutes()));
      setSeconds(appendZeroTimer(date.getSeconds()));
    };

    //check if it's currently am or pm
    const checkAmpm = () => {
      hours >= 12 ? setAmpm("PM") : setAmpm("AM");
    };

    setInterval(displayTimer);
    checkAmpm();
  }, [hours]);

  //play the alarm sound
  const play = () => {
    alarmSound.play();
  };
  //pause the alarm sound
  const pause = () => {
    alarmSound.pause();
  };

  //to set the alarm
  const addAlarm = () => {
    alarmArray.push(alarmObj);
  };

  alarmArray.forEach((alarm, index) => {
    if (active) {
      //check if each alarm is active and the time matches
      if (
        `${alarm.alarmHour}: ${alarm.alarmMinute}` === `${hours}: ${minutes}`
      ) {
        play();   //play sound if it's time
        alert(`The time is ${hours}: ${minutes} ${ampm}`);  //alert if it's time
        setActive(!active)   //set to inactive to deactivate alert
      }
    }
    if (!active) {
      pause();
    }
  });


  //to remove an alarm from the array
  const deleteAlarm = (data) => {
    setAlarmArray(alarmArray.filter((alarm) => alarm?.id !== data));
  };

  return (
    <div
      className={
        // changes to dark move from 6pm to 6am
        hours <=6 || hours >= 18
          ? "bg-dark-gradient text-dark"
          : "bg-light-gradient text-light"
      }
    >
      <div className="min-h-[100vh] py-[6rem]">
        <div className="wrapper  min-h-[300px] p-4 md:w-[500px] w-[80%] mx-auto rounded-[10px] flex flex-col justify-center items-center">
          <div className="timer-display text-[40px] text-center">
            {hours}:{minutes}:{seconds} {hours >= 12 ? "PM" : "AM"}
          </div>
          <div className="wrapper">
            <div className="inputs flex justify-center gap-3 items-center mt-4">
              <input
                type="number"
                id="hourInput"
                placeholder="00"
                min={0}
                max={23}
                required
                onChange={(e) => setHourInput(e.target.value)}
                className="p-2 border w-[50px] text-center border rounded bg-transparent"
              />
              <input
                type="number"
                id="minuteInput"
                placeholder="00"
                min={0}
                max={59}
                required
                onChange={(e) => setMinuteInput(e.target.value)}
                className="p-2 border w-[50px] text-center border rounded bg-transparent"
              />
            </div>

            <button
              id="set"
              className="bg-[#377dff] border-0 outline-0 px-4 py-2 mx-auto rounded-[10px] mt-4 flex items-center"
              onClick={addAlarm}
              type="submit"
            >
              <IoIosAlarm className="fill-white mr-2" />
              Set Alarm
            </button>
          </div>
          <div className="activeAlarms my-6 w-full border-t-[1px] w-[85%] mx-auto ">
            {/* map through the alarm array to list alarms */}
            {alarmArray.map((alarm) => (
              <div className="flex   border-b-[1px] p-4 justify-between">
                <div className="text-[20px]">
                  <span>{alarm?.alarmHour}</span> :{" "}
                  <span>{alarm?.alarmMinute}</span>{" "}
                  <span>{alarm?.alarmHour >= 12 ? "PM" : "AM"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={active}
                    id="alarm-check"
                    name={alarm?.id}
                    value={alarm?.isactive}
                    onChange={() => setActive(!active)}
                  />
                  <MdOutlineDeleteOutline
                    onClick={() => {
                      deleteAlarm(alarm?.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
