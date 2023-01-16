// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";
import { MediaPlayer, MediaPlayerInfo, YoutubePlayer } from "./YoutubePlayer";

export interface PlaybackComponentProps{
    playlistItem:PlaylistItem|null;
}
export interface PlaybackComponentState{
    videoTitle:string;
}
export class PlaybackComponent extends React.Component<PlaybackComponentProps, PlaybackComponentState>{
    private _mediaPlayer:MediaPlayer | null;
    constructor(props:PlaybackComponentProps){
        super(props);

        this._mediaPlayer = null;
        this.state = {
            videoTitle:"Nothing Playing"
        };
        
    }

    setMediaPlayer(mediaPlayer:MediaPlayer){
        this._mediaPlayer = mediaPlayer;
    }

    mediaPlayerStateChange(info:MediaPlayerInfo){
        if(info.playState == 1){
            this.setState({videoTitle:info.videoTitle});
        }
    }

    render(): React.ReactNode {
        return (<div>
            <div>{this.state.videoTitle}</div>
            <div>
                <YoutubePlayer
                    setMediaPlayer={this.setMediaPlayer.bind(this)}
                    onMediaPlayerStateChange={this.mediaPlayerStateChange.bind(this)}
                    ></YoutubePlayer>
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