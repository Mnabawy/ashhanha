import { useCallback, useEffect, useState } from "react";
import moment from 'moment';

const resendCodeTime = 60;
const useCountDownTime = (reset) => {

    const [resendTime, setResendTime] = useState(resendCodeTime);
    let setIntervalID = null;

    useEffect(() => {
        setResendTime(resendCodeTime);
        calculateTime();
        return () => {
            clearInterval(setIntervalID);
        }
    }, [reset]);

    const calculateTime = useCallback(async () => {
        let diff = resendTime * 1000;
        var duration = moment.duration(diff, 'milliseconds');
        var interval = 1000;
        if (diff > 0 && resendTime >= 0) {
            setIntervalID = setInterval(() => {
                duration = moment.duration(duration - interval, 'milliseconds');
                let changeTime = `${duration.seconds()}`;
                // console.log("changeTime ", changeTime)
                setResendTime(changeTime);
                if (duration.seconds() <= 0 && duration.minutes() <= 0) {
                    setResendTime(0);
                    console.log("---------- 0 ", duration.seconds(), duration.minutes())
                    clearInterval(setIntervalID);
                }
            }, interval)
        }
    }, [])
    return resendTime;
};

export default useCountDownTime;