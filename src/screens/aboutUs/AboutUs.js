import React, { useCallback, useEffect, useState } from 'react';
import { AppImage, AppSpinner, AppView } from '../../common';
import I18n from 'react-native-i18n';
import logoImg from '../../assets/imgs/logo.png';
import { ScrollableContainer } from '../../components';
import { StaticPagesRepo } from '../../repo';
import SectionContent from '../../components/staticPages/SectionContent';
const staticPagesRepo = new StaticPagesRepo();

const AboutUs = () => {
  const [content, setContent] = useState({
    isLoading: true,
    data: [],
  });
  const getStaticPage = useCallback(async () => {
    const data = await staticPagesRepo.getStaticPage('about-us');
    setContent({
      data,
      isLoading: false,
    });
  }, []);
  useEffect(() => {
    getStaticPage();
  }, [getStaticPage]);

  return (
    <ScrollableContainer
      paddingHorizontal={5}
      flex
      stretch
      paddingBottom={10}
      title={I18n.t('aboutUs')}>
      <AppImage
        source={logoImg}
        equalSize={60}
        centerSelf
      />
      <AppView stretch>
        {content.isLoading ? (
          <AppView flex height={50} stretch center>
            <AppSpinner />
          </AppView>
        ) : (
          <>
            <SectionContent
              content={`${content?.data?.value || ''}`}
            />
          </>
        )}
      </AppView>
    </ScrollableContainer>
  );
};

export default AboutUs;
