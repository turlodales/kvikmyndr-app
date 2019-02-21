import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import { IShowtime } from 'store/models/Showtime';
import { openUrl } from 'utils/openUrl';
import { format, utcToZonedTime } from 'date-fns-tz';
const styles = require('./Showtime.css');

interface IProps {
  testID?: string;
  showtime: IShowtime;
}

export default class Showtime extends React.PureComponent<IProps, {}> {

  @autobind
  onPress() {
    const { ticketUrl } = this.props.showtime;
    if (!ticketUrl) {
      return null;
    }

    return openUrl(ticketUrl);
  }

  render() {
    const {
      showtime,
      testID,
    } = this.props;

    const date = utcToZonedTime(showtime.playingAt!, 'America/New_York');

    return (
      <View style={[styles.host, showtime.disabled ? styles.disabled : {}]} testID={testID}>
        <TouchableOpacity onPress={this.onPress} style={styles.button} disabled={showtime.disabled}>
          <Text style={styles.hour}>
            {format(date, 'HH:mm', { timeZone: 'GMT' })}
          </Text>
        </TouchableOpacity>
        {!!showtime.room && <Text style={styles.room}>{showtime.room}</Text>}
      </View>
    );
  }
}
