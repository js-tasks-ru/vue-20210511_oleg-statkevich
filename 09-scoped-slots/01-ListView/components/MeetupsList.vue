<template>
  <list-view :items="meetupsWithCoverAndBadge">
    <!--
    "X" - некоторый элемент списка, полученный из параметров слота.
    Имя параметра выберите сами и замените X на него в коде ниже.

    <list-view-card
      tag="router-link"
      :to="{ name: 'meetup', params: { meetupId: X.id } }"
      :key="X.id"
      :title="X.title"
      :cover="X.cover"
      :badge="X.badge"
      :badge-success="X.badgeSuccess"
    >
      <meetup-info
        :date="X.date"
        :place="X.place"
        :organizer="X.organizer"
      />
    </list-view-card>
    -->
  </list-view>
</template>

<script>
import ListView from './ListView';
import ListViewCard from './ListViewCard';
import MeetupInfo from './MeetupInfo';
import { getImageUrlByImageId } from '../data';

export default {
  name: 'MeetupsList',

  components: { ListView, ListViewCard, MeetupInfo },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsWithCoverAndBadge() {
      return this.meetups.map((meetup) => {
        const newMeetup = { ...meetup };
        if (meetup.attending) {
          newMeetup.badge = 'Участвую';
          newMeetup.badgeSuccess = true;
        } else if (meetup.organizing) {
          newMeetup.badge = 'Организую';
        }
        newMeetup.cover = meetup.imageId && getImageUrlByImageId(meetup.imageId);
        newMeetup.date = new Date(meetup.date);
        return newMeetup;
      });
    },
  },
};
</script>

<style></style>
