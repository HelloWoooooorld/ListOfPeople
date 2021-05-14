import { useState, useCallback } from 'react';

function useDialog(initialValue = false) {
    const [isAuth, setAuth] = useState(initialValue);

    const toogler = useCallback(() => {

        setAuth(val => !val);
    },[])
    return [isAuth, toogler]

}

export default useDialog;

// function useDialog() {
//     const [isAuth, setAuth] = useState(true);

//     useEffect(() => {
//         const signIn = () => {
//             setAuth(true);
//         }

//         const signOut = () => {
//             setAuth(false);
//         }

//         return [signIn, signOut]
//     }, [])

//     return [isAuth];

// }