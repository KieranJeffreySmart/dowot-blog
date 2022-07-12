import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.cosmicjsPosts
    const siteTitle = get(
      this.props,
      'data.cosmicjsSettings.metadata.site_title'
    )
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={location}>
        <style>
          {`          
          /* The Modal (background) */
          .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
          }

          /* Modal Content (image) */
          .modal-content {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
          }

          /* Caption of Modal Image */
          #caption {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
            text-align: center;
            color: #ccc;
            padding: 10px 0;
            height: 150px;
          }

          /* Add Animation */
          .modal-content, #caption {  
            -webkit-animation-name: zoom;
            -webkit-animation-duration: 0.6s;
            animation-name: zoom;
            animation-duration: 0.6s;
          }

          @-webkit-keyframes zoom {
            from {-webkit-transform:scale(0)} 
            to {-webkit-transform:scale(1)}
          }

          @keyframes zoom {
            from {transform:scale(0)} 
            to {transform:scale(1)}
          }

          /* The Close Button */
          .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
          }

          .close:hover,
          .close:focus {
            color: #bbb;
            text-decoration: none;
            cursor: pointer;
          }

          .post-content {
            text-align: justify;
          }
          .post-hero {
            width: calc(100% + ${rhythm(8)});
            margin-left: ${rhythm(-4)};
            height: ${rhythm(18)};
          }
          @media (max-width: ${rhythm(32)}) {
            .post-hero {
              width: calc(100% + ${rhythm((3 / 4) * 2)});
              margin-left: ${rhythm(-3 / 4)};
              height: ${rhythm(13)};
            }
            .modal-content {
              width: 100%;
            }
          }
        `}
        </style>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div
          style={{
            marginTop: rhythm(1.4),
          }}
        >
          <Link to="/">← Back to Posts</Link>
        </div>
        <h1
          style={{
            marginTop: rhythm(1),
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(0.6),
            marginTop: rhythm(-0.6),
          }}
        >
          {post.created}
        </p>
        <BackgroundImage
          Tag="div"
          className="post-hero"
          fluid={post.metadata.hero.local.childImageSharp.fluid}
          backgroundColor={`#007ACC`}
          style={{
            marginBottom: rhythm(0.6),
          }}
        />
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div id="myModal" class="modal">
          <span id="modal-close" class="close">&times;</span>
          <img class="modal-content" id="img01" />
          <div id="caption"></div>
        </div>
        <script>{`
          // Get the modal
          var modal = document.getElementById("myModal");

          // Get the image and insert it inside the modal - use its "alt" text as a caption
          var images = document.getElementsByClassName("modal-image");
          images.forEach((img, i) => {
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            img.onclick = function(){
              modal.style.display = "block";
              modalImg.src = this.src;
              captionText.innerHTML = this.alt;
            }
          }

          // Get the <span> element that closes the modal
          var span = document.getElementById("modal-close");

          // When the user clicks on <span> (x), close the modal
          span.onclick = function() { 
            modal.style.display = "none";
          }`}
        </script>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio settings={author} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={`posts/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={`posts/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      created(formatString: "MMMM DD, YYYY")
      metadata {
        hero {
          local {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`
