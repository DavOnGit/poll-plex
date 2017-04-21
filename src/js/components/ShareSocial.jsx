import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  // PinterestShareButton,
  VKShareButton,
  OKShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const TelegramIcon = generateShareIcon('telegram')
const WhatsappIcon = generateShareIcon('whatsapp')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
// const PinterestIcon = generateShareIcon('pinterest')
const VKIcon = generateShareIcon('vk')
const OKIcon = generateShareIcon('ok')

class ShareSocial extends React.Component {
  render () {
    const { url, title, descr } = this.props
    return (
      <div className='share-social small-12'>
        <div className='row align-spaced'>
          <FacebookShareButton url={url} title={title} description={descr}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <GooglePlusShareButton url={url}>
            <GooglePlusIcon size={32} />
          </GooglePlusShareButton>
          <LinkedinShareButton url={url} title={title} description={descr}>
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} />
          </TwitterShareButton>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={32} />
          </TelegramShareButton>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
          {/* <PinterestShareButton url={pollPath} description={descr}><PinterestIcon size={32} /></PinterestShareButton> */}
          <VKShareButton url={url} title={title} description={descr}>
            <VKIcon size={32} />
          </VKShareButton>
          <OKShareButton url={url} title={title} description={descr}>
            <OKIcon size={32} />
          </OKShareButton>
        </div>
      </div>
    )
  }
}

export default ShareSocial
