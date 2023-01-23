// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";
import { MediaPlayer, MediaPlayerInfo, YoutubePlayer, YT } from "./YoutubePlayer";
import "./PlaybackComponent.css";

export enum PlaybackControllerEvent {
    Paused = 0,
    Playing = 1,
    Next = 2,
    Previous = 3,
}

export interface PlaybackComponentProps {
    onPlaybackEvent: (event: PlaybackControllerEvent) => void;
    url: string | undefined;
}
export interface PlaybackComponentState {
    videoTitle: string;
    autoPlay: boolean;
}
export class PlaybackComponent extends React.Component<PlaybackComponentProps, PlaybackComponentState>{
    private _mediaPlayer: MediaPlayer | null;
    constructor(props: PlaybackComponentProps) {
        super(props);

        this._mediaPlayer = null;
        this.state = {
            videoTitle: "Nothing Playing",
            autoPlay: true
        };

    }

    setMediaPlayer(mediaPlayer: MediaPlayer) {
        this._mediaPlayer = mediaPlayer;
    }

    set autoPlay(value:boolean){
        this.setState({autoPlay:value});
    }
    get autoPlay(){
        return this.state.autoPlay;
    }

    mediaPlayerStateChangeHandler(info: MediaPlayerInfo) {
        switch (info.playState) {
            case YT.PlayerState.Playing: {
                if (this.state.videoTitle != info.videoTitle) {
                    this.setState({ videoTitle: info.videoTitle });
                }
                this.props.onPlaybackEvent(PlaybackControllerEvent.Playing);
            } break;
            case YT.PlayerState.Paused: {
                this.props.onPlaybackEvent(PlaybackControllerEvent.Paused);
            } break;
            case YT.PlayerState.Ended: {
                if(this.autoPlay){
                    this.props.onPlaybackEvent(PlaybackControllerEvent.Next);
                }
            } break;
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <h2>{this.state.videoTitle}</h2>
                <div>
                    <YoutubePlayer
                        width={320}
                        height={320}
                        url={this.props.url}
                        setMediaPlayer={this.setMediaPlayer.bind(this)}
                        onMediaPlayerStateChange={this.mediaPlayerStateChangeHandler.bind(this)}
                    ></YoutubePlayer>
                </div>
                <div>
                    <button className="playback-action previous" onClick={() => { this.props.onPlaybackEvent(PlaybackControllerEvent.Previous); }}></button>
                    <button className="playback-action play" onClick={() => { this._mediaPlayer?.play(); }}></button>
                    <button className="playback-action pause" onClick={() => { this._mediaPlayer?.pause() }}></button>
                    <button className="playback-action next" onClick={() => { this.props.onPlaybackEvent(PlaybackControllerEvent.Next); }}></button>
                </div>
                <div>
                    <input type="checkbox" checked={this.state.autoPlay} onChange={(e)=>{this.autoPlay = e.target.checked;}}></input>
                    <label>Autoplay</label>
                </div>
            </div>)
    }


}