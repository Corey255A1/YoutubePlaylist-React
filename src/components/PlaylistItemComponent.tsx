import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";

export interface PlaylistItemComponentProps{
    playlistItem:PlaylistItem;
    onMove:(direction:number)=>void;
    onRemove:(item:PlaylistItem)=>void;
    onPlay:(item:PlaylistItem)=>void;
}

export class PlaylistItemComponent extends React.Component<PlaylistItemComponentProps>{
    constructor(props:PlaylistItemComponentProps){
        super(props);
    }

    render(): React.ReactNode {
        return (
            <li>
                <button>Up</button>
                <button>Down</button>
                <button>Play</button>
                <input type="text" value={this.props.playlistItem.url}></input>
                <button>X</button>
            </li>
        )
    }
}