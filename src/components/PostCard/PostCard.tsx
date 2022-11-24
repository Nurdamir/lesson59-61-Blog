import React from 'react';
import './PostCard.css';

interface Props {
  title: string;
  author: string;
  onClick: React.MouseEventHandler;
}

class PostCard extends React.PureComponent<Props> {

  // shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
  //   return this.props.author !== nextProps.author || this.props.title !== nextProps.title;
  // }

  render() {
    return (
      <article className="PostCard" onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
        <div className="Info">
          <div className="Author">{this.props.author}</div>
        </div>
      </article>
    );
  }
}

export default PostCard;