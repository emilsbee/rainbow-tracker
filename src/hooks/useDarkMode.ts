import {useEffect, useState} from "react";

export function useDarkMode() {
    const [isDark, setIsDark] = useState(null)

    useEffect(() => {
        let localDark = localStorage.getItem("dark")
        if (localDark == null) {
            setIsDark(false)
        } else {
            setIsDark(localDark)
        }
    },[])

    return isDark
}