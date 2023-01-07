import { PlaylistItem } from "./PlaylistItem";

export interface Playlist{
    playlist:Array<PlaylistItem>;
    currentPlayListIndex:number;
}