// Corey Wunderlich 2023
// www.wundervisionenvisionthefuture.com
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PlaybackComponent, PlaybackControllerEvent } from './components/PlaybackComponent';
import { PlaylistComponent } from './components/PlaylistComponent';
import { PlaylistItem } from './data/PlaylistItem';
import { dir } from 'console';

export interface AppState {
  playlist: Array<PlaylistItem>;
  currentPlaybackItem: PlaylistItem | null;
}
export class App extends React.Component<any, AppState>{
  private _nextPlaylistItemID: number;
  constructor(props: any) {
    super(props);
    this.state = {
      playlist: [
        {
          url: "hmphkCD8b_w",
          id: 1
        },
        {
          url: "0QwUo_5yon4",
          id: 2
        },
        {
          url: "oXK_0KXNtU4",
          id: 3
        }
      ],
      currentPlaybackItem: null
    }
    this._nextPlaylistItemID = 4;
  }

  addItemHandler(addToBottom: boolean) {
    const item = new PlaylistItem(this._nextPlaylistItemID++, "");
    if (addToBottom) {
      this.setState({ playlist: [...this.state.playlist, item] })
    } else {
      this.setState({ playlist: [item, ...this.state.playlist] })
    }
  }

  moveItemHandler(item: PlaylistItem, direction: number) {
    const itemIndex = this.state.playlist.indexOf(item);
    let nextItemIndex = itemIndex + direction;
    if (nextItemIndex < 0) {
      nextItemIndex = 0
    }
    else if (nextItemIndex >= this.state.playlist.length) {
      nextItemIndex = this.state.playlist.length - 1;
    }
    const modifiedList = [...this.state.playlist];
    modifiedList.splice(itemIndex, 1);
    modifiedList.splice(nextItemIndex, 0, item)
    this.setState({ playlist: modifiedList });
  }

  playItemHandler(item: PlaylistItem) {
    let index: number = this.state.playlist.indexOf(item);
    this.setState({ currentPlaybackItem: (index != -1 ? item : null) });
    console.log(item);
  }

  removeItemHandler(itemToRemove: PlaylistItem) {
    this.setState({ playlist: this.state.playlist.filter((item) => item != itemToRemove) })
  }

  itemURLChangedHandler(url: string, itemModified: PlaylistItem) {
    console.log("changed")
    this.setState({
      playlist: this.state.playlist.map(item => {
        if (item == itemModified) {
          item.url = url;
        }
        return item;
      })
    })
  }

  playbackEventHandler(event: PlaybackControllerEvent) {
    switch (event) {
      case PlaybackControllerEvent.Next: {
        this.setState((state) => {
          let nextIndex = -1;
          if( state.currentPlaybackItem != null ){
            nextIndex = state.playlist.indexOf(state.currentPlaybackItem);
          }
          nextIndex = nextIndex + 1;
          let nextItem = null;
          if (nextIndex < state.playlist.length) {
            nextItem = state.playlist[nextIndex];
          }
          return { currentPlaybackItem: nextItem };
        })
      } break;
      case PlaybackControllerEvent.Previous: {
        this.setState((state) => {
          let nextIndex = state.playlist.length;
          if( state.currentPlaybackItem != null ){
            nextIndex = state.playlist.indexOf(state.currentPlaybackItem);
          }          
          nextIndex = nextIndex - 1;
          let nextItem = null;
          if (nextIndex >= 0) {
            nextItem = state.playlist[nextIndex];
          }
          return { currentPlaybackItem: nextItem };
        })
      } break;
    }
  }

  render(): React.ReactNode {
    console.log("APP")
    return (
      <div>
        <h1>WunderVision Youtube Player - React</h1>
        <div className="App">
          <div className="section">
            <PlaybackComponent
              url={this.state.currentPlaybackItem?.url}
              onPlaybackEvent={this.playbackEventHandler.bind(this)}
            ></PlaybackComponent>
          </div>
          <div className="section">
            <PlaylistComponent
              activeItem={this.state.currentPlaybackItem}
              playlist={this.state.playlist}
              onAddItem={this.addItemHandler.bind(this)}
              onMoveItem={this.moveItemHandler.bind(this)}
              onPlayItem={this.playItemHandler.bind(this)}
              onRemoveItem={this.removeItemHandler.bind(this)}
              onItemURLChanged={this.itemURLChangedHandler.bind(this)}
            ></PlaylistComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
