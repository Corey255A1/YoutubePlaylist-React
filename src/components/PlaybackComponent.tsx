import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";

export interface PlaybackComponentProps{
    playlistItem:PlaylistItem|null;
}
export class PlaybackComponent extends React.Component<PlaybackComponentProps>{
    constructor(props:PlaybackComponentProps){
        super(props);
    }


    render(): React.ReactNode {
        return (<div>Currently Playing</div>)
    }

    
}