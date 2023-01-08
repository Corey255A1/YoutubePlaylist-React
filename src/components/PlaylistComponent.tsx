import React from "react";
import { Playlist } from "../data/Playlist";
import { PlaylistItem } from "../data/PlaylistItem";
import { PlaylistItemComponent } from "./PlaylistItemComponent";
import "./PlaylistComponent.css";
export interface PlaylistComponentProps{
    playlist:Array<PlaylistItem>;
    onMoveItem:(item:PlaylistItem, direction:number)=>void;
    onAddItem:(addToBottom:boolean)=>void;
    onRemoveItem:(item:PlaylistItem)=>void;
    onPlayItem:(item:PlaylistItem)=>void;

}
export class PlaylistComponent extends React.Component<PlaylistComponentProps>{
    constructor(props:PlaylistComponentProps){
        super(props);
    }

    onMoveItem(item:PlaylistItem, direction:number){
        this.props.onMoveItem(item, direction);
    }

    onRemoveItem(item:PlaylistItem){
        this.props.onRemoveItem(item);
    }

    onPlayItem(item:PlaylistItem){
        this.props.onPlayItem(item);
    }

    onAddItem(addToBottom:boolean){
        this.props.onAddItem(addToBottom);
    }

    render(): React.ReactNode {
        return (
            <div>
                <button onClick={()=>{this.onAddItem(false)}}>+ Add To Top</button>
                <button onClick={()=>{this.onAddItem(true)}}>+ Add To Bottom</button>
            <ul>
            {this.props.playlist.map(item=>{
                return <PlaylistItemComponent
                    key={item.id} 
                    playlistItem={item}
                    onMove={(direction:number)=>this.onMoveItem(item,direction)}
                    onRemove={()=>this.onRemoveItem(item)}
                    onPlay={()=>this.onPlayItem(item)}/>
            })}   
            </ul>
            </div>
        )
    }

    
}