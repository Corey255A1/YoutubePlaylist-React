// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PlaybackComponent } from './components/PlaybackComponent';
import { PlaylistComponent } from './components/PlaylistComponent';
import { PlaylistItem } from './data/PlaylistItem';
import { dir } from 'console';

export interface AppState {
  playlist: Array<PlaylistItem>;
  currentPlaybackItem: PlaylistItem | null;
  currentPlayListIndex: number;

}
export class App extends React.Component<any, AppState>{
  private _nextPlaylistItemID: number;
  constructor(props: any) {
    super(props);
    this.state = {
      playlist: [
        {
          url: "youtube.com/a",
          id: 1
        },
        {
          url: "youtube.com/b",
          id: 2
        },
        {
          url: "youtube.com/c",
          id: 3
        }
      ],
      currentPlaybackItem: null,
      currentPlayListIndex: -1
    }
    this._nextPlaylistItemID = 4;
  }

  onAddItem(addToBottom: boolean) {
    const item = new PlaylistItem(this._nextPlaylistItemID++, this._nextPlaylistItemID.toString());
    if (addToBottom) {
      this.setState({ playlist: [...this.state.playlist, item] })
    } else {
      this.setState({ playlist: [item, ...this.state.playlist] })
    }
  }

  onMoveItem(item: PlaylistItem, direction: number) {
    const itemIndex = this.state.playlist.indexOf(item);
    let nextItemIndex = itemIndex+direction;
    if(nextItemIndex<0){
      nextItemIndex = 0
    }
    else if(nextItemIndex>=this.state.playlist.length){
      nextItemIndex = this.state.playlist.length - 1;
    }
    const modifiedList = [...this.state.playlist];
    modifiedList.splice(itemIndex, 1);
    modifiedList.splice(nextItemIndex, 0, item)
    this.setState({playlist:modifiedList});
  }

  onPlayItem(item: PlaylistItem) {
    console.log(item);
  }

  onRemoveItem(itemToRemove: PlaylistItem) {
    this.setState({ playlist: this.state.playlist.filter((item) => item != itemToRemove) })
  }

  onItemURLChanged(url: string, itemModified: PlaylistItem) {
    this.setState({
      playlist: this.state.playlist.map(item => {
        if (item == itemModified) {
          item.url = url;
        }
        return item;
      })
    })
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <div style={{ width: "50%" }}>
          <PlaybackComponent playlistItem={this.state.currentPlaybackItem}></PlaybackComponent>
        </div>
        <div style={{ width: "50%" }}>
          <PlaylistComponent
            playlist={this.state.playlist}
            onAddItem={this.onAddItem.bind(this)}
            onMoveItem={this.onMoveItem.bind(this)}
            onPlayItem={this.onPlayItem.bind(this)}
            onRemoveItem={this.onRemoveItem.bind(this)}
            onItemURLChanged={this.onItemURLChanged.bind(this)}
          ></PlaylistComponent>
        </div>

      </div>
    );
  }
}

export default App;
