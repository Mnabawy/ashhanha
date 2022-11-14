import React, { useCallback, useEffect, useState } from 'react';
import I18n from 'react-native-i18n';
import { AppSpinner, AppView } from '../../common';
import { ScrollableContainer } from '../../components';
import SectionContent from '../../components/staticPages/SectionContent';
import { StaticPagesRepo } from '../../repo';
const staticPagesRepo = new StaticPagesRepo();

const ShipmentMeasurements = () => {
  const [content, setContent] = useState({
    isLoading: true,
    data: [],
  });
  const getStaticPage = useCallback(async () => {
    const data = await staticPagesRepo.getStaticPage('measurement-instruction');

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
      title={I18n.t('ShipmentMeasurements')}>
      <AppView stretch>
        {content.isLoading ? (
          <AppView flex height={50} stretch center>
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

export default ShipmentMeasurements;
