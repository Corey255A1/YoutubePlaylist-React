import React from "react";
import { Playlist } from "../data/Playlist";
import { PlaylistItem } from "../data/PlaylistItem";
import { PlaylistItemComponent } from "./PlaylistItemComponent";
import "./PlaylistComponent.css";
export interface PlaylistComponentProps{
    playlist:Playlist;
    onItemAdded:(item:PlaylistItem)=>void;
    onItemRemoved:(item:PlaylistItem)=>void;

}
export class PlaylistComponent extends React.Component<Playlist>{
    constructor(props:Playlist){
        super(props);
    }

    onMoveItem(direction:number){

    }

    onRemoveItem(item:PlaylistItem){

    }

    onPlayItem(item:PlaylistItem){

    }

    render(): React.ReactNode {
        return (
            <div>
                <button>+ Add To Top</button>
                <button>+ Add To Bottom</button>
            <ul>
            {this.props.playlist.map(item=>{
                return <PlaylistItemComponent
                    key={item.id} 
                    playlistItem={item}
                    onMove={this.onMoveItem}
                    onRemove={this.onRemoveItem}
                    onPlay={this.onPlayItem}/>
            })}   
            </ul>
            </div>
        )
    }

    
}