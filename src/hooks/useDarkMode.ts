import {useEffect, useState} from "react";

export function useDarkMode() {
    const [isDark, setIsDark] = useState(null)
    let localDark = localStorage.getItem("dark")
    useEffect(() => {
        if (localDark == null) {
            setIsDark(false)
        } else {
            setIsDark(localDark)
        }
    },[localDark])

    return isDark
}