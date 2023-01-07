import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PlaybackComponent } from './components/PlaybackComponent';
import { PlaylistComponent } from './components/PlaylistComponent';
import { PlaylistItem } from './data/PlaylistItem';

export interface AppState{
  playlist:Array<PlaylistItem>;
  currentPlaybackItem:PlaylistItem|null;
  currentPlayListIndex:number;

}
export class App extends React.Component<any, AppState>{
  constructor(props:any){
    super(props);
    this.state = {
      playlist:new Array<PlaylistItem>(),
      currentPlaybackItem:null,
      currentPlayListIndex:-1
    }
  }
  render(): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          Youtube Playlist
        </header>
        <PlaybackComponent playlistItem={this.state.currentPlaybackItem}></PlaybackComponent>
        <PlaylistComponent playlist={this.state.playlist} currentPlayListIndex={this.state.currentPlayListIndex}></PlaylistComponent>
      </div>
    );
  }
}

export default App;
