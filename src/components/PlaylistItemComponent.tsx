import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";

export interface PlaylistItemComponentProps{
    playlistItem:PlaylistItem;
    onMove:(direction:number)=>void;
    onRemove:()=>void;
    onPlay:()=>void;
    onURLChanged:(url:string)=>void;
}

export class PlaylistItemComponent extends React.Component<PlaylistItemComponentProps>{
    private _item:PlaylistItem;
    constructor(props:PlaylistItemComponentProps){
        super(props);
        this._item = props.playlistItem;

    }

    onURLChanged(element:any){
        this.props.onURLChanged(element.target.value)
    }

    render(): React.ReactNode {
        return (
            <li>
                <button onClick={()=>{this.props.onMove(-1)}}>Up</button>
                <button onClick={()=>{this.props.onMove(1)}}>Down</button>
                <button onClick={()=>{this.props.onPlay()}}>Play</button>
                <input type="text" onChange={this.onURLChanged.bind(this)} value={this.props.playlistItem.url}></input>
                <button onClick={()=>{this.props.onRemove()}}>X</button>
            </li>
        )
    }
}