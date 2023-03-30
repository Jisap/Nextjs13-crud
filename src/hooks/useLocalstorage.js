import { useEffect, useState } from 'react'
                                // tasks , [values]
export const useLocalStorage = ( key, initialState) => {

    const [state, setState] = useState(initialState);

    useEffect(() => {                               // Comprobación del contenido de localStorage
        const item = localStorage.getItem(key)      // Intentamos recuperar el contenido ( string )
        const tasks = JSON.parse( item )            // Convertimos el contenido a objeto javaScript
        if( tasks ){                                // Si el contenido existe
            setState( tasks )                       // establecemos el estado
        }    
    },[])

    useEffect(() => {                               // Cada vez que cambie el state se cambia el localStorage                    
        localStorage.setItem( key, JSON.stringify(state) ) // Hay que convertirlo a string para usarlo en localStorage
 
    },[state])

    return [state, setState]
}