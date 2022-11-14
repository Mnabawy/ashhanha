import { useCallback, useEffect, useState } from "react";
import moment from 'moment';

// const resendCodeTime = 2 * 60 * 1; // 1 hour
const useCountDownTimeToBlockResend = (reset, resendCodeTime) => {

    const [resendTime, setResendTime] = useState(resendCodeTime);
    let setIntervalID = null;

    useEffect(() => {
        if (resendCodeTime) {
            setResendTime(resendCodeTime);
            calculateTime();
        }
        return () => {
            clearInterval(setIntervalID);
        }
    }, [reset, resendCodeTime]);

    const calculateTime = useCallback(async () => {
        let diff = resendTime * 1000;
        console.log("xxxxxxxxxx ",diff)
        var duration = moment.duration(diff, 'milliseconds');
        var interval = 1000;
        if (diff > 0 && resendTime >= 0) {
            setIntervalID = setInterval(() => {
                duration = moment.duration(duration - interval, 'milliseconds');
                let changeTime = `0${duration.hours()}:${duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes()}:${duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds()}`;
                console.log("changeTime ", changeTime)
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

export default useCountDownTimeToBlockResend;