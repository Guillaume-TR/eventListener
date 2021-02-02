import React from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';

import facebookIcon from 'src/assets/images/icons/icons8-facebook-50.png';
import twitterIcon from 'src/assets/images/icons/icons8-twitter-50.png';
import mailIcon from 'src/assets/images/icons/mail.png';

const ShareLinks = () => {
  const shareUrl = `eventListener.eu${location.pathname}`;
  const shareText = `Viens découvrir cet événement : ${shareUrl}. Plus d'infos sur eventListener.eu`;

  return (
    <div className="share-links-modal">
      <FacebookShareButton
        url={shareUrl}
        quote={shareText}
      >
        <button type="button">
          <img alt="fb-icon" src={facebookIcon} />
        </button>
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={shareText}
      >
        <button type="button">
          <img alt="twi-icon" src={twitterIcon} />
        </button>
      </TwitterShareButton>

      <EmailShareButton
        subject="Check out this event on eventlistener.eu"
        body={`${shareText}: ${shareUrl}`}
        url={shareUrl}
      >
        <button type="button">
          <img alt="mail-icon" src={mailIcon} />
        </button>
      </EmailShareButton>
    </div>
  );
};

ShareLinks.propTypes = {
};

export default ShareLinks;
