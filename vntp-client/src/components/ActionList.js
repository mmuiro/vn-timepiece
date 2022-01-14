import React, { Fragment, useEffect, useState } from "react";
import { dateToFullDateString } from "../utils/timeUtil";
import ActionCardGroup from "./ActionCardGroup";
import ConnectorLine from "./ConnectorLine";

export default function ActionList({username, actionList}) {
    let [dateGroupedActionList, setDateGroupedActionList] = useState([]);

    const processActionList = (actionList) => {
        // console.log(actionList);
        actionList.reverse();
        let dateMap = new Map(),
            currentDateObj;
        dateGroupedActionList = [];
        actionList.forEach(action => {
            action.date = (new Date(action.date)).toLocaleDateString();
            if (!dateMap.has(action.date)) {
                currentDateObj = { 
                    date: action.date,
                    datedActionList: []
                };
                dateMap.set(action.date, currentDateObj);
            } else { currentDateObj = dateMap.get(action.date); }
            currentDateObj.datedActionList.push(action);
        });
        dateMap.forEach((dateObj) => {
            dateGroupedActionList.push(dateObj);
        });
        setDateGroupedActionList(dateGroupedActionList);
    }

    useEffect(() => {
        processActionList(actionList);
    }, [actionList]);

    return(<div className="w-full h-fit flex flex-col">
        {dateGroupedActionList.map((entry, i) =>
            <ActionCardGroup date={dateToFullDateString(new Date(entry.date))} actionList={entry.datedActionList} connector={i < dateGroupedActionList.length - 1} key={-i}/>
        )}
    </div>);
}