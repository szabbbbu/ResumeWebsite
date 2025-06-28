"use client"
import { useAppContext } from "@/contexts/useAppContext";

/** 
 * on mobile screens, the content should be hidden, since all
 * backgrounds are transparent
 * @return true: if we are on tiny screen AND the menu is hidden, 
 * OR, if we are on desktop view, always show the content
 * 
 * 
 */


export function showContentIfMobileMenuHidden(): boolean {
    const {appWidth, menuHidden} = useAppContext();
    if ( (appWidth <= 768 && menuHidden) || appWidth > 768) {
        return true;
    }
    else {
        return false;
    }
}