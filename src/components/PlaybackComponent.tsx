// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";
import { YoutubePlayer } from "./YoutubePlayer";

export interface PlaybackComponentProps{
    playlistItem:PlaylistItem|null;
}
export class PlaybackComponent extends React.Component<PlaybackComponentProps>{
    private _controller:((msg:string)=>void) | null;
    constructor(props:PlaybackComponentProps){
        super(props);

        this._controller = null;
    }

    setController(controller:(message:string)=>void){
        this._controller = controller;
    }

    youtubeController(msg:string){
        if(this._controller == null) { return; }
        this._controller(msg)
    }

    render(): React.ReactNode {
        return (<div>
            <div>Currently Playing</div>
            <div>
                <YoutubePlayer setController={this.setController.bind(this)}></YoutubePlayer>
            </div>
            <div>
                <button>SkipBack</button>
                <button onClick={()=>{this.youtubeController("play")}}>Play</button>
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