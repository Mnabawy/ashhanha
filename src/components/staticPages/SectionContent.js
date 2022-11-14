import React from 'react';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const SectionContent = ({ content, ...rest }) => {
  const contentWidth = useWindowDimensions().width;
  return (
    <HTML
      source={{ html: content || '<p></p>' }}
      contentWidth={contentWidth}
    />
  );
};
export default SectionContent;
