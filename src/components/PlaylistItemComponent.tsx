// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from "react";
import { PlaylistItem } from "../data/PlaylistItem";
import "./PlaylistItemComponent.css";

export interface PlaylistItemComponentProps {
    playlistItem: PlaylistItem;
    isActive: boolean;
    onMove: (direction: number) => void;
    onRemove: () => void;
    onPlay: () => void;
    onURLChanged: (url: string) => void;
}

export class PlaylistItemComponent extends React.Component<PlaylistItemComponentProps>{
    private _item: PlaylistItem;
    constructor(props: PlaylistItemComponentProps) {
        super(props);
        this._item = props.playlistItem;

    }

    onURLChanged(element: any) {
        this.props.onURLChanged(element.target.value)
    }

    render(): React.ReactNode {
        return (
            <li className={this.props.isActive ? "playlist-item active" : "playlist-item"}>
                <button className="item-action up" onClick={() => { this.props.onMove(-1) }}></button>
                <button className="item-action down" onClick={() => { this.props.onMove(1) }}></button>
                <button className="item-action play" onClick={() => { this.props.onPlay() }}></button>
                <input type="text" onChange={this.onURLChanged.bind(this)} value={this.props.playlistItem.url}></input>
                <button className="item-action close" onClick={() => { this.props.onRemove() }}></button>
            </li>
        )
    }
}