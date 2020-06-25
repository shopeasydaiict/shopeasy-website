import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SelectedFilters,
  ResultCard,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import "./App.css";
import { css } from "emotion";
// import Login from "./Login";
import fire from "./config/fire";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLogin: false,
    };
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut();
  }
  componentDidMount() {
    this.authLister();
  }
  authLister() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, isLogin: true });
      } else this.setState({ user: null, isLogin: false });
    });
  }

  render() {
    return (
      <ReactiveBase
        app="shopeasy-sen"
        credentials="85Ptps7rc:5a1b8ef2-9b83-4195-bfcf-b7a5052ef728"
      >
        <div className="navbar">
          <div className="logo">SHOPEASY DAIICT </div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={["product_name", "product_name.search"]}
            fieldWeights={[5, 1, 3, 1]}
            queryFormat="and"
            placeholder="Search for a product or category"
            innerClass={{
              input: "searchbox",
              list: "suggestionlist",
            }}
            autosuggest={false}
            iconPosition="left"
            filterLabel="search"
          />
          <div>
            {this.state.user ? (
              <button className="bt-login home-login" onClick={this.logout}>
                Logout
              </button>
            ) : (
              <Link to="/Login">
                <button className="bt-login home-login">LOGIN / SIGNUP</button>
              </Link>
            )}
            <Link to="Contact">
              <button className="bt-login home-login">CONTACT US :</button>
            </Link>
          </div>
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            <RangeSlider
              componentId="priceFilter"
              dataField="price"
              title="Price Range"
              filterLabel="prices"
              range={{
                start: 0,
                end: 5000,
              }}
              rangeLabels={{
                start: "\u20B9 0",
                end: "\u20B9 5000",
              }}
              interval={2}
            />
            <MultiList
              componentId="Categories"
              dataField="type"
              class="filter"
              title="Select Category"
              selectAllLabel="All Category"
            />
            <MultiList
              componentId="Source"
              dataField="source"
              class="filter"
              title="Select Source"
              selectAllLabel="All Sources"
            />
          </div>
          <div className={"mainBar"}>
            <SelectedFilters />
            <ReactiveList
              componentId="SearchResult"
              dataField={["product_name", "product_name.search"]}
              size={8}
              pagination
              innerClass={{
                poweredBy: css({
                  display: "none !important",
                }),
              }}
              react={{
                and: [
                  "mainSearch",
                  // "ratingsFilter",
                  "priceFilter",
                  "Source",
                  "Categories",
                ],
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                  {data.map((item) => (
                    <ResultCard key={item.id} href={item.url}>
                      <ResultCard.Image src={item.image} />
                      <ResultCard.Title>
                        <div
                          className="product-title"
                          dangerouslySetInnerHTML={{
                            __html: item.product_name,
                          }}
                        />
                      </ResultCard.Title>

                      <ResultCard.Description>
                        <div className="flex column justify-space-between">
                          <div>
                            <div></div>
                            <div className="ratings-list flex align-center">
                              <span className="price">Rs {item.price}</span>
                            </div>
                          </div>
                          <span className="source">Website: {item.source}</span>
                        </div>
                      </ResultCard.Description>
                    </ResultCard>
                  ))}
                </ReactiveList.ResultCardsWrapper>
              )}
            />
          </div>
        </div>
        <div> {console.log(this.state.isLogin)}</div>
      </ReactiveBase>
    );
  }
}

export default App;
