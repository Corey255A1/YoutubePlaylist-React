import React, { Ref } from "react";
declare global{
    interface Window{
        YT:{
            Player:any;
        },
        onYouTubeIframeAPIReady:()=>void
    }
}
namespace YT{
    export interface Player{
        playVideo:()=>void;
    };
}

export interface YoutubePlayerProps{
    setController:(controller:((msg:string)=>void))=>void;
}

export class YoutubePlayer extends React.Component<YoutubePlayerProps>{
    private _width:number;
    private _height:number;
    private _id:string;
    private _player:YT.Player | null;
    private _playerController:any | null
    private static isInitializeYoutubeCalled:boolean = false;
    private static pendingYoutubeCallbacks:Array<()=>void> = [];

    constructor(props:YoutubePlayerProps){
        
        super(props);
        this._width = 320;
        this._height = 320;
        this._id = "youtube-test";
        this._player = null;
        this._playerController = null;
        this.props.setController(this.controller.bind(this));
        console.log("Construct");
    }

    private static youTubeIframeAPIReady(){
        YoutubePlayer.pendingYoutubeCallbacks.forEach((callback)=>{
            callback();
        })
        YoutubePlayer.pendingYoutubeCallbacks = [];
    }

    private static initializeYoutube(apiReadyCallback:()=>void){
        if(!YoutubePlayer.isInitializeYoutubeCalled){
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

    private controller(message:string){
        console.log(message);
        this._playerController?.playVideo();
    }

    onPlayerReady(event:any){
        console.log("READY!");
        console.log(event);
        this._playerController = event.target;
    }
    onPlayerStateChange(event:any){
        console.log("STATE");
        console.log(event);
    }
    loadVideo(){
        console.log("Load");
        this._player = new window.YT.Player(this._id, {
            events: {
              'playerVars':{
                'mute':1,
                'autoplay':1
              },
              'onReady': this.onPlayerReady.bind(this),
              'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }
    componentDidMount(){
        console.log(this._id);
        if(window.YT === undefined){
            YoutubePlayer.initializeYoutube(this.loadVideo.bind(this));
        }else{
            this.loadVideo();
        }
    }

    render(): React.ReactNode {
        console.log("REnder?")
        return (
            <iframe 
                width={this._width} 
                height={this._height} 
                src="http://www.youtube.com/embed/B-w86z_gbP8?enablejsapi=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                id={this._id}
            ></iframe>
        )
    }
}