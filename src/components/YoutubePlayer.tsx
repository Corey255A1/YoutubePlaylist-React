import React, { Ref } from "react";
declare global {
    interface Window {
        YT: {
            Player: any;
        },
        onYouTubeIframeAPIReady: () => void
    }
}
namespace YT {
    export interface Player {
        playVideo: () => void;
    };
}

export interface MediaPlayer{
    play:()=>void;
    pause:()=>void;
    loadVideoById:(videoId:string, startSeconds:number)=>void;
}

export interface YoutubePlayerProps {
    setMediaPlayer: (controller: MediaPlayer) => void;
}

export class YoutubePlayer extends React.Component<YoutubePlayerProps> implements MediaPlayer{
    private _width: number;
    private _height: number;
    private _id: string;
    private _player: YT.Player | null;
    private _playerController: any | null
    private static isInitializeYoutubeCalled: boolean = false;
    private static pendingYoutubeCallbacks: Array<() => void> = [];

    constructor(props: YoutubePlayerProps) {

        super(props);
        this._width = 320;
        this._height = 320;
        this._id = "youtube-test";
        this._player = null;
        this._playerController = null;
        this.props.setMediaPlayer(this);


    }

    private static youTubeIframeAPIReady() {
        YoutubePlayer.pendingYoutubeCallbacks.forEach((callback) => {
            callback();
        })
        YoutubePlayer.pendingYoutubeCallbacks = [];
    }

    private static initializeYoutube(apiReadyCallback: () => void) {
        if (!YoutubePlayer.isInitializeYoutubeCalled) {
            YoutubePlayer.isInitializeYoutubeCalled = true;
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = YoutubePlayer.youTubeIframeAPIReady;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
        YoutubePlayer.pendingYoutubeCallbacks.push(apiReadyCallback);
    }
    private onPlayerReady(event: any) {
        console.log("READY!");
        console.log(event);
        this._playerController = event.target;
    }
    private onPlayerStateChange(event: any) {
        console.log("STATE");
        console.log(event);
    }
    private loadVideo() {
        console.log("Load");
        this._player = new window.YT.Player(this._id, {
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    public play(){
        this._playerController?.playVideo();
    }

    public pause(){
        this._playerController?.pauseVideo();
    }

    public loadVideoById(id:string, startSeconds:number){
        this._playerController?.loadVideoById(id, startSeconds);
    }

    componentDidMount() {
        console.log(this._id);
        if (window.YT === undefined) {
            YoutubePlayer.initializeYoutube(this.loadVideo.bind(this));
        } else {
            this.loadVideo();
        }
    }

    render(): React.ReactNode {
        console.log("Render?")
        return (
            <iframe
                width={this._width}
                height={this._height}
                src="http://www.youtube.com/embed/B-w86z_gbP8?enablejsapi=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                id={this._id}
            ></iframe>
        )
    }
}