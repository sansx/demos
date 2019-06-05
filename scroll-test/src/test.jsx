import React, { Component } from 'react'
import BScroll from "better-scroll"
import "./test.css";

export default class test extends Component {
  state = {
    num: null
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        num: 50
      })
      let bs = new BScroll('.wrapper', {
        // ...
        pullUpLoad: true,
        // wheel: true,
        // scrollbar: true,
        // and so on
      })
    }, 1000);
  }

  render() {
    const { num } = this.state

    console.log(num);


    return (
      <div className="wrapper">
        <div>
          <span className="content" style={{ height: "500px", display: "inline-block", border: "1px solid red" }} >

            asdsd
            <ul className="content">
              {num && [...new Array(num)].map((res, index) => {
                console.log(res);
                return (<li key={index} >...</li>)
              })}
            </ul>
          </span>
          <div></div>
        </div>

      </div>
    )
  }
}
