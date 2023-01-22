// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from "react";
import { Playlist } from "../data/Playlist";
import { PlaylistItem } from "../data/PlaylistItem";
import { PlaylistItemComponent } from "./PlaylistItemComponent";
import "./PlaylistComponent.css";
import { stringify } from "querystring";
export interface PlaylistComponentProps{
    playlist:Array<PlaylistItem>;
    activeItem:PlaylistItem | null;
    onMoveItem:(item:PlaylistItem, direction:number)=>void;
    onAddItem:(addToBottom:boolean)=>void;
    onRemoveItem:(item:PlaylistItem)=>void;
    onPlayItem:(item:PlaylistItem)=>void;
    onItemURLChanged:(url:string, item:PlaylistItem)=>void;

}
export class PlaylistComponent extends React.Component<PlaylistComponentProps>{
    constructor(props:PlaylistComponentProps){
        super(props);
    }

    moveItem(item:PlaylistItem, direction:number){
        this.props.onMoveItem(item, direction);
    }

    removeItem(item:PlaylistItem){
        this.props.onRemoveItem(item);
    }

    playItem(item:PlaylistItem){
        this.props.onPlayItem(item);
    }

    addItem(addToBottom:boolean){
        this.props.onAddItem(addToBottom);
    }
    urlChangedHandler(url:string, item:PlaylistItem)
    {
        this.props.onItemURLChanged(url, item);
    }

    render(): React.ReactNode {
        return (
            <div>
                <button className="add-item" onClick={()=>{this.addItem(false)}}>Add To Top</button>
                <button className="add-item" onClick={()=>{this.addItem(true)}}>Add To Bottom</button>
            <ul>
            {this.props.playlist.map(item=>{
                return <PlaylistItemComponent
                    isActive={this.props.activeItem == item}
                    key={item.id} 
                    playlistItem={item}
                    onMove={(direction:number)=>this.moveItem(item,direction)}
                    onRemove={()=>this.removeItem(item)}
                    onPlay={()=>this.playItem(item)}
                    onURLChanged={(url:string)=>this.urlChangedHandler(url, item)}/>
            })}   
            </ul>
            </div>
        )
    }

    
}