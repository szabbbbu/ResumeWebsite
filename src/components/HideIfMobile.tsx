"use client"
import { useAppContext } from '@/contexts/useAppContext';
import {ReactNode} from 'react'

type Props = {
    children: ReactNode;
}

export default function HideIfMobile({children}: Props) {
  const {menuHidden, appWidth} = useAppContext();
    if (menuHidden || !(appWidth < 680)) {
        return <>{children}</>;
    }
    return null;
}