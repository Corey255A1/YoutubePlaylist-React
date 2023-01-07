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
        return (<div>
            <div>Currently Playing</div>
            <div>YOUTUBE VIDEO</div>
            <div>
                <button>SkipBack</button>
                <button>Play</button>
                <button>Pause</button>
                <button>SkipForward</button>
            </div>
            <div>
            <input type="checkbox"></input>
            <label>Autoplay</label>
            </div>
            </div>)
    }

    
}