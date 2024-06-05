import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import useAtBottom from "./use-at-bottom";

type Props = {
    trackVisibility?: boolean;
};

const ChatScrollAnchor = ({ trackVisibility }: Props) => {

    const isAtBottom = useAtBottom();
    const { ref, entry, inView } = useInView({
        trackVisibility,
        delay: 100,
        rootMargin: '0px 0px -50px 0px',
    });

    useEffect(() => {
        if (isAtBottom && trackVisibility && !inView) {
            entry?.target.scrollIntoView({
                block: 'start',
            });
        }
    }, [inView, entry, isAtBottom, trackVisibility]);

    return <div className="h-px w-full" ref={ref} />;
}

export default ChatScrollAnchor;