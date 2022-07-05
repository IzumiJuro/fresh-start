/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const timeFmt = new Intl.RelativeTimeFormat('zh-CN');

export default function CountDown(props: {target: string}) {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow((now) => {
        if (now > target) {
          clearInterval(timer);
        }
        return new Date();
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [props.target]);

  if (now > target) {
    return <span>🎉</span>
  }

  const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000);
  return <span>{timeFmt.format(secondsLeft, 'seconds')}</span>
}
