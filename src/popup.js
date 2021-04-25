/* globals chrome, React, ReactDOM */
"use strict"

const e = React.createElement

class LikeButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {liked: false, greeting: "unchanged greeting"}
	}

	render() {
		if (typeof this.state.liked !== "undefined" && this.state.liked) {
			return "You liked this, and " + this.state.greeting
		}

		return e("button", {onClick: this.onClickHandler.bind(this)}, "Like")
	}

	onClickHandler() {
		chrome.storage.sync.get(
			["greeting"],
			function (res) {
				this.setState({liked: true, greeting: res.greeting})
			}.bind(this)
		)
	}
}

const domContainer = document.querySelector("#like_button_container")
ReactDOM.render(e(LikeButton), domContainer)
