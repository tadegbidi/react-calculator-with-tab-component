import { useEffect, useState } from "react";


export default function useKey(key) {
    // const [log, setLog] = useState(null);

    useEffect(function() {

        function callBack(e) {
            e.preventDefault();

            if (e.code.toLowerCase() === key.toLowerCase()) {
                console.log(e.code);
            };
        }

        document.addEventListener('keydown', callBack);

        return function() { 
            document.removeEventListener('keydown', callBack); 
        }
    }, [key]
    );

    // return { log };
}