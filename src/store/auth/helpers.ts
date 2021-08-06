/**
 * Checks whether the user is logged in.
 * @param userid for which to check login status.
 */
export const checkIfLoggedIn = async (userid: string):Promise<boolean> => {
    let res = await fetch(`${process.env.REACT_APP_HOST}/user/${userid}/auth/is-logged-in`,
        {
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        )

    return res.ok
}