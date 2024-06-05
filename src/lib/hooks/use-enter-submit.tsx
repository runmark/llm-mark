import { useRef, type KeyboardEvent, type RefObject } from "react";

const useEnterSubmit = (): {
    formRef: RefObject<HTMLFormElement>;
    onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {

        if (
            event.key === 'Enter'
            && !event.shiftKey
            && !event.nativeEvent.isComposing
        ) {
            formRef.current?.requestSubmit();
            event.preventDefault();
        }
    };

    return { formRef, onKeyDown: handleKeyDown }
};

export default useEnterSubmit;