import React, { useCallback, useEffect, useState } from 'react';
import { AppImage, AppSpinner, AppText, AppView } from '../../common';
import I18n from 'react-native-i18n';
import { ScrollableContainer } from '../../components';
import { StaticPagesRepo } from '../../repo';
import SectionContent from '../../components/staticPages/SectionContent';
import colors from '../../common/defaults/colors';
const staticPagesRepo = new StaticPagesRepo();

const TermsAndConditions = ({ onPop }) => {
  const [content, setContent] = useState({
    isLoading: true,
    data: [],
  });
  const getStaticPage = useCallback(async () => {
    const data = await staticPagesRepo.getStaticPage('terms');
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
      padding={5}
      paddingBottom={10}
      backgroundColor={colors.bg}
      flex
      stretch
      title={I18n.t('termsAndConditions')}>
      <AppView stretch>
        {content.isLoading ? (
          <AppView flex height={90} stretch center>
            <AppSpinner />
          </AppView>
        ) : (
          <>
            <SectionContent content={`${content?.data?.value || ''}`} />
          </>
        )}
      </AppView>
    </ScrollableContainer>
  );
};

export default TermsAndConditions;
