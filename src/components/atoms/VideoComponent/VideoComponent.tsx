import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './VideoComponent.scss';
import {Alert, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import YoutubePlayer from 'react-native-youtube-iframe';
import {SCREEN_WIDTH} from 'src/config/consts';

/**
 * File: VideoComponent.tsx
 * @created 2021-04-27 01:17:11
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<VideoComponentProps>>}
 */
const VideoComponent: FC<PropsWithChildren<VideoComponentProps>> = (
  props: PropsWithChildren<VideoComponentProps>,
): ReactElement => {
  const {videoLink} = props;
  const [playing, setPlaying] = React.useState(false);

  const onStateChange = React.useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = React.useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const getYoutubeID = React.useCallback((link: string): string => {
    return link.slice(-11);
  }, []);

  return (
    <View style={[atomicStyles.alignItemsCenter, atomicStyles.radius10px]}>
      <YoutubePlayer
        height={345}
        width={SCREEN_WIDTH}
        play={playing}
        videoId={getYoutubeID(videoLink)}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export interface VideoComponentProps {
  //
  videoLink?: string;
}

VideoComponent.defaultProps = {
  //
};

VideoComponent.propTypes = {
  //
};

VideoComponent.displayName = nameof(VideoComponent);

export default React.memo(VideoComponent);
