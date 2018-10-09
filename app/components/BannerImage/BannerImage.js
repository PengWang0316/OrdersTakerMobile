import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Styles from './Styles';
import { fetchBasicInformation } from '../../actions/BasicInformationActions';

type Props = {
  basicInformation: Object,
  fetchBasicInformation: Function,
};

/**
 * The component to show the banner image.
 */
export class BannerImage extends Component<Props> {
  /**
   * Calling the fetchBasicInformation action if the Redux state has not been filled yet.
   * @param {object} props contains prop values.
   */
  constructor(props) {
    super(props);
    const dimensions = Dimensions.get('window');
    this.imageWidth = dimensions.width;
    this.imageHeight = Math.floor(dimensions.height * 0.25);
    if (!props.basicInformation) props.fetchBasicInformation();
  }

  /**
   * The render method
   * @return {jsx} Return jsx.
   */
  render() {
    const { basicInformation } = this.props;
    return (
      <View style={Styles.rootView}>
        {basicInformation && (
          <Image
            source={{ uri: basicInformation.banners[0].url }}
            style={{ width: this.imageWidth, height: this.imageHeight }}
          />
        )}
      </View>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = ({ basicInformation }) => ({
  basicInformation,
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchBasicInformation: () => dispatch(fetchBasicInformation()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BannerImage);
