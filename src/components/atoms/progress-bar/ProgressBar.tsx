import React, {useEffect, useState} from "react";

type ProgressBarType = {
    progressLoading: boolean,
}
export const ProgressBar: React.FC<ProgressBarType> = ({progressLoading}) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (progressLoading) {
            const interval = setInterval(() => {
                setProgress(prevState => {
                    const nextState = prevState + 1
                    if (nextState >= 100) {
                        clearInterval(interval)
                    }
                    return nextState
                });
            }, 150);
            return () => clearInterval(interval);
        } else {
            setProgress(0)
        }
    }, [progressLoading, progress])

    return (
        <>
            {progressLoading &&
              <div className="w-full bg-gray-200 h-1 absolute bottom-0 -ml-8">
                <div className="bg-indigo-500 h-1 transition-all" style={{width: `${progress}%`}}/>
              </div>
            }
        </>
    )
}
