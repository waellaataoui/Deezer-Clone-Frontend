import { useState, useRef, useEffect } from 'react';
//this hook fixes the automatic state handling of the navigation buttons
const useSwiperRef = () => {
    const [wrapper, setWrapper] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        setWrapper(ref.current);
    }, []);

    return [
        wrapper,
        ref
    ]
};

export default useSwiperRef;