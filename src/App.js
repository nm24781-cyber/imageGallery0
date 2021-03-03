import "./App.css";
import * as React from "react";
import HttpClient from "react-http-client";
import { CardGenerator } from "./components/image-card.component";
import SearchAppBar from "./components/search-bar.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageData: [],
      query: ""
    };
  }

  async componentDidMount() {
    const fetchedImageData = await this.getImageDataFromAPI();
    this.setState({ ImageData: fetchedImageData });
  }

  searchingHandler = async (e) => {
    const query = e.target.value;
    if (!query) {
      this.componentDidMount();
    } else {
      this.setState({ query }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  render() {
    const { ImageData } = this.state;
    return (
      <div>
        <SearchAppBar searchingHandler={this.searchingHandler}></SearchAppBar>
        <div className="images-list">
          {ImageData.map((Item, index) => {
            return <CardGenerator key={index} item={Item}></CardGenerator>;
          })}
        </div>
      </div>
    );
  }

  async getImageDataFromAPI() {
    return await HttpClient.get(
      `https://api.unsplash.com/photos/?client_id=S2eyFFgoKmt8gXr5m-nfLoxhWxs5RQxxsPiCAhj-t7E`
    );
  }

  fetchSearchResults = (query) => {
    const searchUrl = `https://api.unsplash.com/search/photos/?client_id=S2eyFFgoKmt8gXr5m-nfLoxhWxs5RQxxsPiCAhj-t7E&query=${query}`;
    HttpClient.get(searchUrl)
      .then(({ results }) => {
        this.setState({
          ImageData: results
        });
      })
      .catch((error) => {
        if (error) {
          this.setState({});
        }
      });
  };
}

export default App;
