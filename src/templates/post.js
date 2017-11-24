import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

const Post = ({ data }) => {
  const post = {
    id: data.post.id,
    slugs: data.post.slugs,
    title: data.post.data.title,
    contents: data.post.data.contents,
  };

  return (
    <div className="container">
      <h1>{ RichText.asText(post.title) }</h1>
      <div>{ RichText.render(post.contents) }</div>
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const query = graphql`
  query PostQuery($slug: String!) {
    post: prismicDocument(slugs: { in: [$slug] }) {
      id
      data {
        title {
          type
          text
        }
        contents {
          type
          text
        }
      }
    }
  }
`;

export default Post;
