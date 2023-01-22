import React, { Ref } from "react";
declare global {
    interface Window {
        YT: {
            Player: any;
        },
        onYouTubeIframeAPIReady: () => void
    }
}
export namespace YT {
    export interface Player {
        playVideo: () => void;
    };

    export enum PlayerState {
        Uninitialized = -1,
        Ended = 0,
        Playing = 1,
        Paused = 2,
        Buffering = 3,
        Cued = 5
    }
}

export interface MediaPlayer {
    play: () => void;
    pause: () => void;
    loadVideoById: (videoId: string, startSeconds: number) => void;
}

export interface MediaPlayerInfo {
    readonly playState: number;
    readonly videoTitle: string
}

export interface YoutubePlayerProps {
    url: string | undefined;
    width:number;
    height:number;
    setMediaPlayer: (controller: MediaPlayer) => void;
    onMediaPlayerStateChange: (info: MediaPlayerInfo) => void;
}

export class YoutubePlayer extends React.Component<YoutubePlayerProps> implements MediaPlayer, MediaPlayerInfo {
    private static waitingForIframeAPIReady: boolean = false;
    private static pendingYoutubeCallbacks: Array<() => void> = [];

    private _width: number;
    private _height: number;
    private _id: string;
    private _player: YT.Player | null;
    private _playerController: any | null
    private _playState: number;
    private _videoTitle: string;

    constructor(props: YoutubePlayerProps) {
        super(props);
        this._width = props.width;
        this._height = props.height;
        this._id = "youtube-iframe-" + Math.floor(Math.random() * 1000000);
        this._player = null;
        this._playerController = null;
        this._playState = -1;
        this._videoTitle = "";
        this.props.setMediaPlayer(this);
        console.log("constructor");
    }

    private static youTubeIframeAPIReady() {
        YoutubePlayer.pendingYoutubeCallbacks.forEach((callback) => {
            callback();
        })
        YoutubePlayer.pendingYoutubeCallbacks = [];
    }

    private static initializeYoutube(apiReadyCallback: () => void) {
        if (!YoutubePlayer.waitingForIframeAPIReady) {
            YoutubePlayer.waitingForIframeAPIReady = true;
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = YoutubePlayer.youTubeIframeAPIReady;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
        YoutubePlayer.pendingYoutubeCallbacks.push(apiReadyCallback);
    }

    public get playState() {
        return this._playState;
    }
    public get videoTitle() {
        return this._videoTitle;
    }

    private onPlayerReady(event: any) {
        console.log("READY!");
        console.log(event);
        this._playerController = event.target;
    }
    private onPlayerStateChange(event: any) {
        console.log("STATE");
        console.log(event);
        this._videoTitle = event.target.videoTitle;
        this._playState = event.data;
        this.props.onMediaPlayerStateChange(this);
    }
    private initializePlayer() {
        this._player = new window.YT.Player(this._id, {
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    public play() {
        this._playerController?.playVideo();
    }

    public pause() {
        this._playerController?.pauseVideo();
    }

    public loadVideoById(videoId: string, startSeconds: number) {
        this._playerController?.loadVideoById(videoId, startSeconds);
    }

    componentDidMount() {
        console.log(this._id);
        if (window.YT === undefined) {
            YoutubePlayer.initializeYoutube(this.initializePlayer.bind(this));
        } else {
            this.initializePlayer();
        }
    }

    componentDidUpdate(prevProps: Readonly<YoutubePlayerProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.url != undefined && prevProps.url != this.props.url) {
            this.loadVideoById(this.props.url, 0);
        } else if (this.props.url == undefined) {
            this._playerController?.stopVideo();
        }
    }

    render(): React.ReactNode {
        console.log("Render?")
        return (
            <iframe
                width={this._width}
                height={this._height}
                src="http://www.youtube.com/embed?enablejsapi=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                id={this._id}
            ></iframe>
        )
    }
}