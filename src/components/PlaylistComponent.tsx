import React from "react";
import { Playlist } from "../data/Playlist";

export interface PlaylistComponentProps{
    playlist:Playlist,
    onItemAdded:Function,
    onItemRemoved:Function

}
export class PlaylistComponent extends React.Component<Playlist>{
    constructor(props:Playlist){
        super(props);
    }


    render(): React.ReactNode {
        return (<div>Hello Everyone</div>)
    }

    
}