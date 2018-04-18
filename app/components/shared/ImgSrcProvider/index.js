import React, {Component} from 'react'


export default function imgSrcProvider(WrappedComponent){


  return class ImgSrcProvider extends Component {



    constructor(props){
      super(props)
      
      const {
        image,
        image: {
          localId,
          organization,
          organization: {
            subdomain,
            id: orgId,
            customImageApiEnabled
          },

        },
        quality
      } = props

      let src = ''


      switch (true) {
        case (subdomain === 'local'): {
          src = `${process.env.LOCAL_TILE_URL}/static/${image.id}/${quality}.jpeg`
          break
        }
        case (customImageApiEnabled): {
          console.log('mia')
          src = `https://cdn.dx.artsmia.org/thumbs/tn_${image.localId}.jpg`
          break
        }
        default: {
          console.log('default')

          src = `${process.env.S3_URL}/mia-lume/${orgId}/${image.id}/${quality}.png`
          break
        }
      }

      this.state = {
        src
      }
    }

    render(){
      return (
        <WrappedComponent
          src={this.state.src}
        />
      )
    }

  }

}
