// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";
import { MediaPlayer, YoutubePlayer } from "./YoutubePlayer";

export interface PlaybackComponentProps{
    playlistItem:PlaylistItem|null;
}
export class PlaybackComponent extends React.Component<PlaybackComponentProps>{
    private _mediaPlayer:MediaPlayer | null;
    constructor(props:PlaybackComponentProps){
        super(props);

        this._mediaPlayer = null;
    }

    setMediaPlayer(mediaPlayer:MediaPlayer){
        this._mediaPlayer = mediaPlayer;
    }

    render(): React.ReactNode {
        return (<div>
            <div>Currently Playing</div>
            <div>
                <YoutubePlayer setMediaPlayer={this.setMediaPlayer.bind(this)}></YoutubePlayer>
            </div>
            <div>
                <button onClick={()=>{this._mediaPlayer?.loadVideoById("Qt0-9mO-ZXY",0)}}>SkipBack</button>
                <button onClick={()=>{this._mediaPlayer?.play()}}>Play</button>
                <button onClick={()=>{this._mediaPlayer?.pause()}}>Pause</button>
                <button onClick={()=>{this._mediaPlayer?.loadVideoById("viIQYswj1Rk",0)}}>SkipForward</button>
            </div>
            <div>
            <input type="checkbox"></input>
            <label>Autoplay</label>
            </div>
            </div>)
    }

    
}