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
      playlist:[
        {
          url:"youtube.com/a",
          id:1
        },
        {
          url:"youtube.com/b",
          id:2
        },
        {
          url:"youtube.com/c",
          id:3
        }
      ],
      currentPlaybackItem:null,
      currentPlayListIndex:-1
    }
  }
  render(): React.ReactNode {
    return (
      <div className="App">
        <div style={{width:"50%"}}>
        <PlaybackComponent playlistItem={this.state.currentPlaybackItem}></PlaybackComponent>
        </div>
        <div style={{width:"50%"}}>
        <PlaylistComponent playlist={this.state.playlist} currentPlayListIndex={this.state.currentPlayListIndex}></PlaylistComponent>
        </div>
        
      </div>
    );
  }
}

export default App;
