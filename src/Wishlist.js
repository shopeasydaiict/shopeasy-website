import React, { Component } from "react";
import fire from "./config/fire";
import "./wishlist.css";
import { Link } from "react-router-dom";
import App from "./App";
import "./App.css";
import { css } from "emotion";
import {
  ReactiveBase,
  ResultCard,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button } from 'react-bootstrap';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistData: [],
      user_id: null,
      user_email: "",
    };
  }

  componentDidMount() {
    this.authLister();
    // this.getWishlist();
  }

  logout() {
    fire.auth().signOut();
  }

  authLister() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user_id: user.uid, user_email: user.email });
        var data = [];
        var uid;

        fire
          .firestore()
          .collection("users")
          .doc(this.state.user_id)
          .collection("wishlist")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var newData = JSON.stringify(doc.data());
              var json_doc = JSON.parse(newData);
              json_doc.id = doc.id;
              data.push(json_doc);
            });

            this.setState({
              wishlistData: data,
            });
            console.log(data);
          });
      }
    });
  }

  refreshPage() {
    window.location.reload(false);
  }

  removeFromWishlist(e, doc_id) {
    e.preventDefault();
    fire
      .firestore()
      .collection("users")
      .doc(this.state.user_id)
      .collection("wishlist")
      .doc(doc_id)
      .delete()
      .then(() => {
        this.authLister();
      })
      .catch(function(err) {
        console.log("FAIL" + err);
      });
  }

  render() {
    return (
      <div className="wishlist-body">
        <div className="top">
          <div className="left">
            <a href="/">
              {" "}
              {/*homepage link*/}
              {/* <img border="" alt="ShopEasy" src={require("./resources/shopeasy_logo.png")}></img> if image not visible use this*/}
              <img
                alt="ShopEasy"
                src={require("./resources/shopeasy_logo_xs.png")}
                style={{ width: "100px", margin: "1%" }}
                width="100px"
              />
            </a>
            <h1>Your Wishlist</h1>
          </div>
          <div className="right">
            <h3>{this.state.user_email}</h3>
            <Link to="/">
              <button onClick={this.logout} className="bt-login">
                LOGOUT
              </button>
            </Link>
          </div>
        </div>
        <ReactiveBase
            app="shopeasy"
            credentials="85Ptps7rc:5a1b8ef2-9b83-4195-bfcf-b7a5052ef728"
         >
            <ReactiveList
              componentId="SearchResult"
              size={6}
              pagination
              innerClass={{
                poweredBy: css({
                  display: "none !important",
                }),
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                  {this.state.wishlistData.map((data) => (
                    <ResultCard key={data.id} href={data.product_url}>
                    <ResultCard.Image src={data.image_url} />
                    <ResultCard.Title>
                      <div
                        className="product-title"
                        dangerouslySetInnerHTML={{
                          __html: data.name,
                        }}
                      />
                    </ResultCard.Title>

                    <ResultCard.Description>
                      <div className="flex column justify-space-between">
                          <div className="ratings-list flex align-center">
                            <span className="price">Rs {data.price}</span>
                          </div>
                        <span className="source">Website: {data.source}</span>
                        <button
                              className="bt-wishlist"
                              onClick={(e) => this.removeFromWishlist(e, data.idd)}>
                              Rem WISHLIST
                            </button>

                        </div>

                    </ResultCard.Description>
                    </ResultCard>
                 ))};

                </ReactiveList.ResultCardsWrapper>
              )}
            />
         </ReactiveBase>



          </div>

    );
  }
}

export default Wishlist;
