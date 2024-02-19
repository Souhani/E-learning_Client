import { store } from '@/redux/store'
import { FC } from 'react'
import { Provider } from 'react-redux'

export function Providers({ children }:any) {
    return <Provider store={ store }>
             { children }
           </Provider>;
}