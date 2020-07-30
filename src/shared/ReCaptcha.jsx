import React, { Component } from "react";
import { ReCaptcha } from "react-recaptcha-google";

class Recaptcha extends Component {
  componentDidMount() {
    if (this.captchaDemo) {
      console.log("started, just a second...");
      this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  render() {
    return (
      <div>
        {/* You can replace captchaDemo with any ref word */}
        <ReCaptcha
          ref={(el) => {
            this.captchaDemo = el;
          }}
          size="normal"
          data-theme="dark"
          render="explicit"
          sitekey="6LfZyLYZAAAAAL1mfLZNk-t2SfXsmT7FE1fSdLD6"
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.props.onRecaptchaVerify}
        />
      </div>
    );
  }
}
export default Recaptcha;
