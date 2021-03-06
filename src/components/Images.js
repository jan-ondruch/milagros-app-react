import React, { Component } from 'react'


/**
 * Container for the images part.
 */
const Images = (props) => {
	// images
	if (props.name === 'images') {
		return (
			<div className="image-tiles" id="postsGrid">
				{props.data.map((x) => (
			    <ImageTile alt={x.caption.text} 
			    					 					src={x.images.standard_resolution.url}
			    					 					caption={x.caption.text}
			    					 					likes={x.likes.count}
			    					 					tags={x.tags}
			    					 					key={x.id}
			    />
			    // A good rule of thumb is that elements inside the map() call need keys.
			  ))}
			</div>
		)
	}
	// videos
	else if (props.name === 'videos') {
		let videos = props.data.filter((x) => {
			return x.type === 'video'
		})
		let videoTiles = []
			videos.forEach((x) => {
			videoTiles.push(<VideoTile key={x.id} src={x.videos.standard_resolution.url} />)
		})
		return (
			<div id="postsGrid" className="video-tiles">
				{videoTiles}
			</div>
		)
	}
}

/**
 * Container for an image.
 * State for interactive UX.
 */
class ImageTile extends Component {	
	constructor(props) {
		super(props)
		this.state = {hover: false}
		this.mouseOver = this.mouseOver.bind(this)
		this.mouseOut = this.mouseOut.bind(this)
	}

	mouseOver() {
		this.setState({hover: true})
	}

	mouseOut() {
		this.setState({hover: false})
	}

	render() {
		// Render default image look and image with info onHover.
		if (this.state.hover) {
			return (
				<div className="darken" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
					<img alt={this.props.alt} src={this.props.src}></img>
					<span>
						{this.props.likes} likes
					</span>
					<div>
						{this.props.tags.map((x) => <p key={x}>{x}</p>)}
					</div>
				</div>
			)
		}
		else {
			// Empty elements must be there for non-glitching onHover.
			return (
				<div className="lighten" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
					<img alt={this.props.alt} src={this.props.src}></img>
					<span></span>
					<div>
						{this.props.tags.map((x) => <p key={x}></p>)}
					</div>
				</div>
			)
		}
	}
}

/**
 * Render elements on the screen.
 */
const VideoTile = (props) => (	
	<div className="video">
		<video width="100%" height="100%" controls>
  		<source src={props.src} type="video/mp4"></source>
  	</video>
	</div>
)

export default Images